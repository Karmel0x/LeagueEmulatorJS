
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import _Minion, { MinionType } from '@repo/gameserver/src/game/basedata/characters/minion';
import package1 from './package';
import type AttackableUnit from '@repo/gameserver/src/gameobjects/units/attackable-unit';
import _Basicattack from '@repo/gameserver/src/game/basedata/spells/basicattack';
//import BasicAttack from './spells/BasicAttack';


/**
 * @abstract
 */
export default class _Minion_MechCannon extends _Minion {
	static package = package1;

	id = MinionType.cannon;

	static reward = {
		gold: 40,
		exp: 92,
	};
	static rewardPerLevel = {
		gold: 1,
		exp: 0,
	};

	static stats = {
		health: {
			baseValue: 700,
			perLevel: 27,
		},
		healthRegen: 0,
		mana: 0,
		manaRegen: 0,
		attackDamage: {
			baseValue: 40,
			perLevel: 3,
		},
		attackSpeed: 1,
		attackSpeedOffset: 0,
		crit: 0,
		attackRange: 450,
		armor: {
			baseValue: 15,
			perLevel: 3,
		},
		resist: {
			baseValue: 0,
			perLevel: 3,
		},
		moveSpeed: 325,

		collisionRadius: 65,
	};

	static spells = {
		BasicAttack: _Basicattack,
	};

	get base() {
		return this.constructor as typeof _Minion_MechCannon;
	}

	constructor(owner: AttackableUnit) {
		super(owner);

		this.createOnSlots({
			[SlotId.A]: this.base.spells.BasicAttack,
		});
	}
}
