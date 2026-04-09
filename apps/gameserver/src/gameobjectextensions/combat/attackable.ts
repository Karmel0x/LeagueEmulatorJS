
import type { Vector2Like } from '@repo/geometry';
import { IssueOrderType } from '@repo/packets/base/c2s/0x72-IssueOrderReq';
import type { NetId } from '@repo/packets/types/player';
import GameObjectList from '../../app/game-object-list';
import Server from '../../app/server';
import { ChannelingStopSource } from '../../constants/enums';
import { SlotId, SlotType, SpellbookType } from '../../constants/slot-id';
import { TIMER_FPS_DELAY } from '../../core/timer';
import { delay } from '../../core/utils';
import { AiType } from '../../gameobjects/unit-ai/types';
import type AttackableUnit from '../../gameobjects/units/attackable-unit';
import Filters from '../filters/index';
import * as Measure from '../measure';
import BasicAttacks from './basic-attacks';
import Spellable, { getSlotData, type SpellableEvents } from './spellable';

export type AttackableEvents = SpellableEvents & {
	'afterBasicAttack': () => void;
	'attackTargetChange': (target: AttackableUnit | undefined) => void;
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
	nextAttackTime = 0;
	autoAttackSlot = SlotId.a;

	constructor(owner: AttackableUnit, respawnable = false) {
		super(owner, respawnable);

		owner.eventEmitter.on('spawn', () => {
			this.autoAttackLoop();
		});

		owner.eventEmitter.on('resurrect', () => {
			this.autoAttackLoop();
		});

		owner.eventEmitter.on('changeOrder', (issuedOrder) => {
			if (issuedOrder === IssueOrderType.attackTo || issuedOrder === IssueOrderType.attackMove || issuedOrder === IssueOrderType.petHardAttack)
				return;

			this.attackTarget = undefined;
			owner.eventEmitter.emit('attackTargetChange', this.attackTarget);
		});

		this.basicAttacks = new BasicAttacks(owner);
	}

	checkTarget(target: AttackableUnit) {
		if (!target.combat.canBeAttacked()) {
			return false;
		}

		const characterState = target.characterState;
		if (!characterState.targetable) {
			return false;
		}

		return true;
	}

	checkTargetInAcR(target: AttackableUnit) {
		const targetIsOk = this.checkTarget(target);
		if (!targetIsOk)
			return false;

		const owner = this.owner;
		const acquisitionRange = owner.stats.acquisitionRange.total || 750;
		if (!Measure.edgeToEdge.isInRange(owner.position, target, acquisitionRange))
			return false;

		return true;
	}

	setOrderAndTarget(target: AttackableUnit, order: AttackOrder | undefined = undefined) {
		const owner = this.owner;
		if (owner.characterState.channeling) {
			try {
				owner.combat.cancelChanneling(ChannelingStopSource.attack);
			}
			catch (e) {
				if (e instanceof Error) {
					console.log(e.message);
					return;
				}
			}
		}

		const targetIsOk = this.checkTarget(target);
		if (!targetIsOk)
			return;

		this.order = order;
		this.attackTarget = target;
		owner.eventEmitter.emit('attackTargetChange', this.attackTarget);
	}

	startAttackAndFollow(target: AttackableUnit, order: AttackOrder | undefined = undefined) {
		this.setOrderAndTarget(target, order);

		const owner = this.owner;
		const attackRange = owner.stats.attackRange.total || 400;
		const attackRange2E = attackRange + target.collisionRadius;
		owner.moving.follow(target, attackRange2E);
	}

	getAttackSpellInfo() {
		const owner = this.owner;
		const character = owner.character;
		if (!character)
			return;

		const spells = character.spells;
		if (!spells)
			return;

		const slot = this.autoAttackSlot;
		const slotData = getSlotData(owner, slot);

		const spell = slotData.overrideSpell ?? spells[slot];
		if (!spell)
			return;

		return {
			spell,
			spellSlot: slot,
			spellbookType: SpellbookType.champion,
			slotType: SlotType.spell,
			slotData,
			isAutoAttack: true,
		};
	}

	castAttack() {
		if (!this.attackTarget)
			return false;

		const owner = this.owner;

		const e = {
			skipNextAutoAttack: false,
		};
		owner.eventEmitter.emit('preAttack', this.attackTarget, e);

		if (e.skipNextAutoAttack)
			return true;

		const spellInfo = this.getAttackSpellInfo();
		if (!spellInfo) {
			//throw new Error();
			return true;
		}

		const spell = spellInfo.spell;
		//spell.castRange = owner.stats.attackRange.total;

		owner.eventEmitter.emit('launchAttack', this.attackTarget);

		spell.cast(owner, {
			// TODO: this.order should not be here like that
			packet: this.order || {
				targetNetId: this.attackTarget.netId,
			},
			...spellInfo,
		});

		return true;
	}

	attackTarget?: AttackableUnit = undefined;
	autoAttackToggle = true;

	readonly attackTargetUnitTypesOrder = [AiType.Minion, AiType.Hero, AiType.Building];

	/**
	 * Find new target in acquisitionRange, sort by type and distance
	 */
	getNewAttackTargetInAcR() {
		const owner = this.owner;
		const ownerTeamId = owner.team.id;
		const units = GameObjectList.aliveUnits;
		const enemyUnits = units.filter(unit => unit.team.id !== ownerTeamId && unit.combat.canBeAttacked());

		const acquisitionRange = owner.stats.acquisitionRange.total || 400;
		let unitsInAcR = Measure.edgeToEdge.filterByRange(owner, enemyUnits, acquisitionRange);
		if (!unitsInAcR.length)
			return;

		Measure.centerToCenter.sortByDistance(owner, unitsInAcR);
		const types = this.attackTargetUnitTypesOrder;
		//unitsInRange = Filters.filterByTypeName(unitsInRange, types);
		unitsInAcR = unitsInAcR.filter(target => target.ai && types.includes(target.ai.type) && target.characterState.targetable);
		Filters.sortByAiType(unitsInAcR, types);
		return unitsInAcR[0];
	}

	/**
	 * Find target to attack or get previous target if still in range
	 */
	findNewTargetInAcR() {
		let target = this.getNewAttackTargetInAcR();
		if (target) {
			let targetIsOk = this.checkTarget(target);
			if (targetIsOk)
				return target;
		}
	}

	/**
	 * Find target to attack or get previous target if still in range
	 */
	findTargetInAcR() {
		let target = this.attackTarget;
		if (target) {
			let targetIsOk = this.checkTargetInAcR(target);
			if (targetIsOk)
				return target;
		}

		target = this.findNewTargetInAcR();
		return target;
	}

	//canFollowTarget(target: Unit) {
	//	// todo: checks if target is visible, didn't died, ...
	//	return true;
	//}

	canAttack() {
		const owner = this.owner;
		const characterState = owner.characterState;

		if (!characterState.canAttack)
			return false;
		if (characterState.disarmed)
			return false;
		if (characterState.sleep)
			return false;
		if (characterState.stunned)
			return false;
		if (characterState.suppressed)
			return false;

		if (characterState.charmed)
			return false;
		//if (characterState.taunted)
		//	return false;

		return true;
	}

	/**
	 * Scan for enemy units in range and attack nearest one
	 */
	attackInRange(target: AttackableUnit) {
		const owner = this.owner;

		if (this.castingSpell.length > 0)
			return false;
		if (owner.moving._waypointsForced.length)
			return false;

		const characterState = owner.characterState;
		if (characterState.channeling)
			return false;

		// TODO: should not be called every 33ms
		const attackRange = owner.stats.attackRange.total || 400;
		const attackRange2E = attackRange + target.collisionRadius;
		owner.moving.follow(target, attackRange2E - 1);

		const distanceToTarget = owner.distanceTo(target);
		if (distanceToTarget > attackRange2E)
			return false;

		//owner.moving.waypointsOrdered = [];
		//owner.moving.moveClear();
		const canAttack = this.canAttack();
		if (!canAttack)
			return false;

		const attackCasted = this.castAttack();
		if (!attackCasted)
			return false;

		owner.eventEmitter.emit('afterBasicAttack');
		return true;
	}

	getAttackCooldown() {
		const owner = this.owner;
		const attackSpeed = owner.stats.attackSpeed.total || 0.625;
		const cooldown = 1 / Math.min(attackSpeed, 2.55);
		return cooldown;
	}

	async autoAttackLoop() {
		if (!this.getAttackSpellInfo())
			return;

		if (!Server.game.loaded) {
			while (!Server.game.loaded)
				await delay(100);

			await delay(1000 * 5);
		}

		// @todo remove this delay but minions does not go lane atm
		await delay(TIMER_FPS_DELAY);
		const owner = this.owner;

		const task1 = Server.gameLoop.add((updateTime) => {
			if (this.died) {
				Server.gameLoop.remove(task1);
				return;
			}

			const target = this.attackTarget;
			if (!target)
				return;

			const targetIsOk = this.checkTarget(target);
			if (!targetIsOk) {
				this.attackTarget = undefined;
				owner.eventEmitter.emit('attackTargetChange', this.attackTarget);
				return;
			}

			if (updateTime < this.nextAttackTime)
				return;

			const attacked = this.attackInRange(target);

			if (attacked) {
				const attackCooldown = this.getAttackCooldown() * 1000;
				this.nextAttackTime = updateTime + attackCooldown;
			}

		});
	}

}
