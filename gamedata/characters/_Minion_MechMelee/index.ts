
import { SlotId } from '@workspace/gameserver/src/constants/slot-id';
import _Minion, { MinionType } from '@workspace/gameserver/src/game/basedata/characters/minion';
import package1 from './package';
import type AttackableUnit from '@workspace/gameserver/src/gameobjects/units/attackable-unit';
import _Basicattack from '@workspace/gameserver/src/game/basedata/spells/basicattack';
//import BasicAttack from './spells/BasicAttack';


/**
 * @abstract
 */
export default class _Minion_MechMelee extends _Minion {
	static package = package1;

	id = MinionType.super;

	static reward = {
		gold: 40,
		exp: 97,
	};
	static rewardPerLevel = {
		gold: 1,
		exp: 0,
	};

	static stats = {
		health: {
			baseValue: 1500,
			perLevel: 200,
		},
		healthRegen: 0,
		mana: 0,
		manaRegen: 0,
		attackDamage: {
			baseValue: 190,
			perLevel: 10,
		},
		attackSpeed: 0.694,
		attackSpeedOffset: 0,
		crit: 0,
		attackRange: 100,
		armor: 30,
		resist: -30,
		moveSpeed: 325,

		collisionRadius: 65,
	};

	static spells = {
		BasicAttack: _Basicattack,
	};

	get base() {
		return this.constructor as typeof _Minion_MechMelee;
	}

	constructor(owner: AttackableUnit) {
		super(owner);

		this.createOnSlots({
			[SlotId.A]: this.base.spells.BasicAttack,
		});
	}
}
