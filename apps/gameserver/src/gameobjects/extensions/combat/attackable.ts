
import type { Vector2Like } from '@repo/geometry';
import { IssueOrderType } from '@repo/packets/base/c2s/0x72-IssueOrderReq';
import { NetId } from '@repo/packets/types/player';
import GameObjectList from '../../../app/game-object-list';
import Server from '../../../app/server';
import { SlotId } from '../../../constants/slot-id';
import Timer from '../../../core/timer';
import { delay } from '../../../core/utils';
import type { Player } from '../../unit-ai';
import { AiType } from '../../unit-ai/base-ai';
import type AttackableUnit from '../../units/attackable-unit';
import Filters from '../filters/index';
import * as Measure from '../measure';
import BasicAttacks from './basic-attacks';
import Spellable, { SpellableEvents } from './spellable';

export type AttackableEvents = SpellableEvents & {
	'noTargetsInRange': () => void;
	'afterBasicAttack': () => void;
};

type AttackOrder = {
	position?: Vector2Like;
	//endPosition?: Vector2Like;
	targetNetId: NetId;
};

/**
 * Trait for units that can attack
 */
export default class Attackable extends Spellable {
	declare readonly owner: AttackableUnit;
	basicAttacks;
	order: AttackOrder | undefined;
	lastAttackTime = 0;

	constructor(owner: AttackableUnit, respawnable = false) {
		super(owner, respawnable);

		this.owner.eventEmitter.on('spawn', () => {
			this.autoAttackLoop();
		});

		this.owner.eventEmitter.on('resurrect', () => {
			this.autoAttackLoop();
		});

		this.owner.eventEmitter.on('changeOrder', () => {
			this.attackTarget = undefined;
			this.order = undefined;
			this.acquisitionManual = undefined;
		});

		this.basicAttacks = new BasicAttacks(this.owner);
	}

	startAttack(order: AttackOrder) {
		this.order = order;
		this.acquisitionManual = order.targetNetId;

		if (this.acquisitionManual) {
			const attackRange = this.owner.stats.attackRange.total || 400;
			this.owner.moving.follow(this.acquisitionManual, attackRange);
		}
	}

	getAttackSpell() {
		const character = this.owner.character;
		if (!character)
			return;

		const spells = character.spells;
		if (!spells)
			return;

		const slot = SlotId.a;
		const spell = spells[slot];
		if (!spell)
			return;

		return spell;
	}

	castAttack() {
		if (!this.attackTarget)
			return;

		this.owner.eventEmitter.emit('preAttack', this.attackTarget);
		const spell = this.getAttackSpell();
		if (!spell)
			return;

		this.owner.eventEmitter.emit('launchAttack', this.attackTarget);
		spell.eventEmitter.emit('cast', this.owner, {
			packet: this.order || {
				targetNetId: this.attackTarget.netId,
			},
			spell,
		});
	}

	attackTarget?: AttackableUnit = undefined;
	autoAttackToggle = true;

	_acquisitionManual?: AttackableUnit = undefined;
	get acquisitionManual(): AttackableUnit | undefined {
		return this._acquisitionManual;
	}
	set acquisitionManual(target: AttackableUnit | NetId | undefined) {
		if (typeof target === 'number') {
			target = GameObjectList.unitByNetId(target);
		}

		this._acquisitionManual = target;
	}

	/**
	 * Get current target if in attackRange
	 */
	getCurrentAttackTargetIfInAcquisitionRange() {
		if (!this.attackTarget || !this.attackTarget.combat.canBeAttacked())
			return;

		const acquisitionRange = this.owner.stats.acquisitionRange.total || 750;
		if (!Measure.edgeToEdge.isInRange(this.owner, this.attackTarget, acquisitionRange))
			return;

		return this.attackTarget;
	}

	attackTargetUnitTypesOrder = [AiType.Minion, AiType.Hero, AiType.Building];

	/**
	 * Find new target in range, sort by type and distance
	 */
	getNewAttackTarget() {
		const ownerTeamId = this.owner.team.id;
		const enemyUnits = GameObjectList.aliveUnits.filter(unit => unit.team.id !== ownerTeamId);

		const attackRange = this.owner.stats.attackRange.total || 400;
		let unitsInRange = Measure.edgeToEdge.filterByRange(this.owner, enemyUnits, attackRange);
		if (!unitsInRange.length)
			return;

		Measure.centerToCenter.sortByDistance(this.owner, unitsInRange);
		//unitsInRange = Filters.filterByTypeName(unitsInRange, this.attackTargetUnitTypesOrder);
		const types = this.attackTargetUnitTypesOrder;
		unitsInRange = unitsInRange.filter(target => target.ai && types.includes(target.ai.type));
		Filters.sortByAiType(unitsInRange, this.attackTargetUnitTypesOrder);
		return unitsInRange[0];
	}

	shouldAcquisiteTarget() {
		if (!this.autoAttackToggle)
			return false;

		if (this.owner.moving.waypointsForced.length)//@todo
			return false;

		const issuedOrder = this.owner.issuedOrder;
		if (issuedOrder === IssueOrderType.moveTo) {
			if (this.owner.moving.waypoints.length)
				return false;
		}
		else if (issuedOrder !== IssueOrderType.orderNone && issuedOrder !== IssueOrderType.attackTo && issuedOrder !== IssueOrderType.attackMove)
			return false;

		return true;
	}

	/**
	 * Find target to attack or get previous target if still in range
	 */
	findTargetInAcquisitionRange() {
		if (!this.shouldAcquisiteTarget())
			return;

		let target = this.getCurrentAttackTargetIfInAcquisitionRange();
		if (target && !target.combat.died)
			return target;

		target = this.getNewAttackTarget();
		if (target && !target.combat.died)
			return target;
	}

	/**
	 * Set attackTarget to attack
	 */
	setAttackTarget(target: AttackableUnit) {
		if (this.attackTarget === target)
			return;

		this.attackTarget = target;

		//const packet1 = packets.AI_TargetHero.create({
		//	netId: this.netId,
		//	targetNetId: target.netId,
		//});
		//this.packets.toEveryone(packet1);
	}

	//canFollowTarget(target: Unit) {
	//	// todo: checks if target is visible, didn't died, ...
	//	return true;
	//}

	getTargetInAcquisitionManual() {
		const issuedOrder = this.owner.issuedOrder;
		if (issuedOrder !== IssueOrderType.attackTo && issuedOrder !== IssueOrderType.attackMove)
			return;

		const target = this.acquisitionManual;
		if (!target)
			return;

		if (target.combat.died)
			return;

		//const acquisitionRange = this.owner.stats.acquisitionRange.total || 750;
		//if (this.owner.position.distanceTo(target.position) > acquisitionRange)
		//	return;

		return target;
	}

	emitted_noTargetsInRange = false;
	haltedMovement: boolean[] = [];

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

					//if (this.owner.issuedOrder === IssueOrderType.attackMove) {
					//	this.owner.moving.unhaltMovement(this.haltedMovement);
					//}

					this.owner.eventEmitter.emit('noTargetsInRange');
					(this.owner.ai as Player)?.packets?.chatBoxDebugMessage('noTargetsInRange');
				}
				return;
			}
		}
		this.emitted_noTargetsInRange = false;

		//if (this.owner.issuedOrder === IssueOrderType.attackMove && this.haltedMovement.length < 1) {
		//	this.haltedMovement = this.owner.moving.haltMovement();
		//}

		//if (this.attackTarget === target)
		//	return;

		const attackRange = this.owner.stats.attackRange.total || 400;
		this.owner.moving.follow(target, attackRange - 1);

		const distanceToTarget = this.owner.distanceTo(target);
		if (distanceToTarget > attackRange)
			return;

		this.setAttackTarget(target);
		this.lastAttackTime = Timer.app.now();

		this.castAttack();
		this.owner.eventEmitter.emit('afterBasicAttack');
	}

	getAttackCooldown() {
		const attackSpeed = this.owner.stats.attackSpeed.total || 0.625;
		const cooldown = 1 / Math.min(attackSpeed, 2.55);
		return cooldown;
	}

	async autoAttackLoop() {
		if (!this.getAttackSpell())
			return;

		if (!Server.game.loaded) {
			while (!Server.game.loaded)
				await delay(100);

			await delay(1000 * 5);
		}

		// @todo remove this delay but minions does not go lane atm
		await delay(33);// ~30hz

		while (!this.died) {
			await this.attackInRange();

			let currentDelay: number;
			let cooldown: number;

			do {
				await delay(33);// ~30hz
				currentDelay = Timer.app.now() - this.lastAttackTime;
				cooldown = this.getAttackCooldown() * 1000;
			}
			while (currentDelay < cooldown);
		}
	}

}
