
import type { Vector2Like } from '@repo/geometry';
import { IssueOrderType } from '@repo/packets/base/c2s/0x72-IssueOrderReq';
import type { NetId } from '@repo/packets/types/player';
import GameObjectList from '../../app/game-object-list';
import Server from '../../app/server';
import { SlotId } from '../../constants/slot-id';
import Timer, { runAccurateInterval, TIMER_FPS_DELAY } from '../../core/timer';
import { delay } from '../../core/utils';
import type { Player } from '../../gameobjects/unit-ai';
import { AiType } from '../../gameobjects/unit-ai/types';
import type AttackableUnit from '../../gameobjects/units/attackable-unit';
import Filters from '../filters/index';
import * as Measure from '../measure';
import BasicAttacks from './basic-attacks';
import Spellable, { type SpellableEvents } from './spellable';

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
	nextAttackTime = 0;
	autoAttackSlot = SlotId.a;

	constructor(owner: AttackableUnit, respawnable = false) {
		super(owner, respawnable);

		this.owner.eventEmitter.on('spawn', () => {
			this.autoAttackLoop();
		});

		this.owner.eventEmitter.on('resurrect', () => {
			this.autoAttackLoop();
		});

		this.owner.eventEmitter.on('changeOrder', (issuedOrder) => {
			if (issuedOrder !== IssueOrderType.hold && issuedOrder !== IssueOrderType.moveTo)
				return;

			this.attackTarget = undefined;
			this.order = undefined;
			this.acquisitionManual = undefined;
		});

		this.basicAttacks = new BasicAttacks(this.owner);
	}

	startAttack(order: AttackOrder) {
		const owner = this.owner;
		this.order = order;
		this.acquisitionManual = order.targetNetId;

		if (this.acquisitionManual) {
			const attackRange = owner.stats.attackRange.total || 400;
			owner.moving.follow(this.acquisitionManual, attackRange);
		}
	}

	getAttackSpell() {
		const character = this.owner.character;
		if (!character)
			return;

		const spells = character.spells;
		if (!spells)
			return;

		const slot = this.autoAttackSlot;
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
			target: this.attackTarget,
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
		const target = this.attackTarget;
		if (!target || !target.combat.canBeAttacked())
			return;

		const owner = this.owner;
		const acquisitionRange = owner.stats.acquisitionRange.total || 750;
		if (!Measure.edgeToEdge.isInRange(owner, target, acquisitionRange))
			return;

		return target;
	}

	attackTargetUnitTypesOrder = [AiType.Minion, AiType.Hero, AiType.Building];

	/**
	 * Find new target in range, sort by type and distance
	 */
	getNewAttackTarget() {
		const owner = this.owner;
		const ownerTeamId = owner.team.id;
		const enemyUnits = GameObjectList.aliveUnits.filter(unit => unit.team.id !== ownerTeamId);

		const attackRange = owner.stats.attackRange.total || 400;
		let unitsInRange = Measure.edgeToEdge.filterByRange(owner, enemyUnits, attackRange);
		if (!unitsInRange.length)
			return;

		Measure.centerToCenter.sortByDistance(owner, unitsInRange);
		//unitsInRange = Filters.filterByTypeName(unitsInRange, this.attackTargetUnitTypesOrder);
		const types = this.attackTargetUnitTypesOrder;
		unitsInRange = unitsInRange.filter(target => target.ai && types.includes(target.ai.type));
		Filters.sortByAiType(unitsInRange, this.attackTargetUnitTypesOrder);
		return unitsInRange[0];
	}

	shouldAcquisiteTarget() {
		if (!this.autoAttackToggle)
			return false;

		const owner = this.owner;
		const issuedOrder = owner.issuedOrder;
		if (issuedOrder === IssueOrderType.moveTo) {
			if (owner.moving.waypointsOrdered.length)
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
		const owner = this.owner;
		const issuedOrder = owner.issuedOrder;
		if (issuedOrder !== IssueOrderType.attackTo && issuedOrder !== IssueOrderType.attackMove)
			return;

		const target = this.acquisitionManual;
		if (!target)
			return;

		if (target.combat.died)
			return;

		//const acquisitionRange = owner.stats.acquisitionRange.total || 750;
		//if (owner.position.distanceTo(target.position) > acquisitionRange)
		//	return;

		return target;
	}

	emitted_noTargetsInRange = false;
	haltedMovement: boolean[] = [];

	/**
	 * Scan for enemy units in range and attack nearest one
	 */
	async attackInRange() {
		const owner = this.owner;

		if (this.owner.moving._waypointsForced.length)
			return false;

		let target = this.getTargetInAcquisitionManual();
		if (!target) {
			target = this.findTargetInAcquisitionRange();
			if (!target) {
				if (!this.emitted_noTargetsInRange) {
					this.emitted_noTargetsInRange = true;

					//if (owner.issuedOrder === IssueOrderType.attackMove) {
					//	owner.moving.unhaltMovement(this.haltedMovement);
					//}

					owner.eventEmitter.emit('noTargetsInRange');
					(owner.ai as Player)?.packets?.chatBoxDebugMessage('noTargetsInRange');
				}
				return false;
			}
		}
		this.emitted_noTargetsInRange = false;

		//if (this.owner.issuedOrder === IssueOrderType.attackMove && this.haltedMovement.length < 1) {
		//	this.haltedMovement = owner.moving.haltMovement();
		//}

		//if (this.attackTarget === target)
		//	return;

		const attackRange = owner.stats.attackRange.total || 400;
		owner.moving.follow(target, attackRange - 1);

		const distanceToTarget = owner.distanceTo(target);
		if (distanceToTarget > attackRange)
			return false;

		this.setAttackTarget(target);
		this.lastAttackTime = Timer.app.now();

		this.castAttack();
		owner.eventEmitter.emit('afterBasicAttack');
		return true;
	}

	getAttackCooldown() {
		const owner = this.owner;
		const attackSpeedTotal = owner.stats.attackSpeed.total || 0.625;
		const cooldown = 1 / Math.min(attackSpeedTotal, 2.55);
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
		await delay(TIMER_FPS_DELAY);

		const stopInterval = runAccurateInterval(async (updateTime) => {

			if (updateTime < this.nextAttackTime)
				return;

			const attacked = await this.attackInRange();

			if (attacked) {
				const attackCooldown = this.getAttackCooldown() * 1000;
				this.nextAttackTime = updateTime + attackCooldown;
			}

		}, TIMER_FPS_DELAY);

		const owner = this.owner;
		owner.eventEmitter.on('death', () => {
			stopInterval();
		});
	}

}
