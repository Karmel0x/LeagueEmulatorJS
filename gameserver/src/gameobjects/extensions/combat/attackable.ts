
import * as packets from '@workspace/packets/packages/packets';
import { SlotId } from '../../../constants/slot-id';
import UnitList from '../../../app/unit-list';
import Defendable, { DefendableEvents, IDefendable } from './defendable';
import Filters from '../filters/index';

import Unit, { UnitEvents } from '../../units/unit';
import { NetId } from '@workspace/packets/packages/packets/types/player';
import { LookAtType } from '@workspace/packets/packages/packets/base/s2c/0x010F-UnitSetLookAt';
import TypedEventEmitter from 'typed-emitter';
import * as Measure from '../measure';

export type AttackableEvents = DefendableEvents & {
	'noTargetsInRange': () => void;
	'afterBasicAttack': () => void;
}

export interface IAttackable extends IDefendable {
	eventEmitter: TypedEventEmitter<AttackableEvents>;
	combat: Attackable;
}

/**
 * Trait for units that can attack
 * @depends IStatOwner, ISpellable
 */
export default class Attackable extends Defendable {
	declare owner: IAttackable;

	constructor(owner: IAttackable) {
		super(owner);

		this.owner.eventEmitter.on('respawn', () => {
			this.autoAttackLoop();
		});
	}

	castAttack(packet: packets.IssueOrderReqModel) {
		//let slot = packet.slot;
		//
		//if (slot < SlotId.A || slot > SlotId.A9)
		//	return;

		this.acquisitionManual = packet.targetNetId;
		this.autoAttackSoftToggle = true;
	}

	attack(target: IDefendable) {

		if (!target)
			return console.log('unit does not exist', target);

		if (!target.combat)
			return console.log('unit cannot be damaged', target.netId, target.constructor.name);

		//if(this.owner.team.id === target.team.team.id)
		//	return;

		console.log('BattleUnit.attack', this.owner.netId, target.netId);
		let dmg = {
			ad: 0,
			ap: 0,
		};
		dmg.ad += this.owner.stats.attackDamage.total;
		target.combat.damage(this.owner, dmg);
	}

	attackByNetId(targetNetId: NetId) {
		if (!targetNetId)
			return console.log('unit does not exist', targetNetId);

		let target = UnitList.unitsNetId[targetNetId] as IDefendable;
		return this.attack(target);
	}

	attackTarget: Unit | null = null;
	autoAttackToggle = true;
	autoAttackSoftToggle = true;

	_acquisitionManual: Unit | null = null;
	get acquisitionManual() {
		return this._acquisitionManual;
	}
	set acquisitionManual(target) {
		if (target && typeof target != 'object')
			target = UnitList.getUnitByNetId(target);

		this._acquisitionManual = target;
	}

	/**
	 * Get current target if in attackRange
	 */
	getCurrentAttackTargetIfInAcquisitionRange() {
		if (!this.attackTarget || !this.attackTarget.canBeAttacked())
			return null;

		if (!Measure.edgeToEdge.isInRange(this.owner, this.attackTarget, this.owner.stats.attackRange.total || 400))
			return null;

		return this.attackTarget;
	}

	attackTargetUnitTypesOrder = ['Minion', 'Player', 'Turret', 'Inhibitor', 'Nexus'];

	/**
	 * Find new target in range, sort by type and distance
	 */
	getNewAttackTarget(): Unit | null {
		let unitsInRange = Measure.edgeToEdge.filterByRange(this.owner, this.owner.getEnemyUnits(), this.owner.stats.attackRange.total || 400);
		if (!unitsInRange.length)
			return null;

		Measure.centerToCenter.sortByDistance(this.owner, unitsInRange);
		unitsInRange = Filters.filterByTypeName(unitsInRange, this.attackTargetUnitTypesOrder);
		Filters.sortByType(unitsInRange, this.attackTargetUnitTypesOrder);
		return unitsInRange[0];
	}

	shouldAutoAttackNow() {
		if (!this.autoAttackToggle)
			return false;
		if (!this.autoAttackSoftToggle && this.owner.moving?.waypoints?.length)
			return false;
		if (this.owner.callbacks.move?.dash)//@todo
			return false;
		return true;
	}

	/**
	 * Find target to attack or get previous target if still in range
	 */
	findTargetInAcquisitionRange() {
		if (!this.shouldAutoAttackNow())
			return null;

		let target = this.getCurrentAttackTargetIfInAcquisitionRange();
		if (target)
			return target;

		target = this.getNewAttackTarget();
		if (target)
			return target;

		return null;
	}

	/**
	 * Set attackTarget to attack
	 */
	setAttackTarget(target: Unit) {
		if (this.attackTarget === target)
			return;

		this.attackTarget = target;

		//const packet1 = packets.AI_TargetHero.create({
		//	netId: this.netId,
		//	targetNetId: target.netId,
		//});
		//this.packets.toEveryone(packet1);
	}

	//FaceDirection() {
	//	const packet1 = packets.FaceDirection.create({
	//		netId: this.netId,
	//		flags: { doLerpTime: true },
	//		direction: new Vector3(-0.93, 0, -0.35),
	//		lerpTime: 0.08,
	//	});
	//	this.packets.toEveryone(packet1, loadingStages.notConnected);
	//}

	canFollowTarget(target) {
		// todo: checks if target is visible, didn't died, ...
		return true;
	}
	getTargetInAcquisitionManual() {
		if (!this.acquisitionManual)
			return null;

		return this.acquisitionManual;
	}

	emitted_noTargetsInRange = false;
	/**
	 * Scan for enemy units in range and attack nearest one
	 */
	async attackInRange() {
		let target = this.getTargetInAcquisitionManual();
		if (!target) {
			target = this.findTargetInAcquisitionRange();
			if (!target) {
				if (!this.emitted_noTargetsInRange) {
					this.emitted_noTargetsInRange = true;
					this.owner.eventEmitter.emit('noTargetsInRange');
				}
				return;
			}
		}
		this.emitted_noTargetsInRange = false;

		this.setAttackTarget(target);
		let casted = await this.owner.slots[SlotId.A].cast({ target });
		if (casted) {
			//const packet1 = packets.InstantStop_Attack.create({
			//	netId: this.netId,
			//	flags: {
			//		keepAnimating: true,
			//	},
			//});
			//this.owner.packets.toEveryone(packet1);

			const packet1 = packets.UnitSetLookAt.create({
				netId: this.owner.netId,
				type: LookAtType.unit,
				targetPosition: {
					x: target.position.x,
					y: target.position.y,
					z: 10,
				},
				targetNetId: target.netId,
			});
			this.owner.packets.toEveryone(packet1);

			this.owner.eventEmitter.emit('afterBasicAttack');
		}

		//this.FaceDirection();
		//attackSlot.turretAttackProjectile(basicattack);
	}

	async autoAttackLoop() {
		if (!this.owner.slots[SlotId.A])
			return console.log('unit is Attackable but has no basic attacks', this.owner.name);

		while (!this.died) {
			await this.attackInRange();
			await Promise.delay(100);
		}
	}

}
