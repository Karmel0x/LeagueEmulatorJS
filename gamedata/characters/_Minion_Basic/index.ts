
import { SlotId } from '@workspace/gameserver/src/constants/slot-id';
import _Minion, { MinionType } from '@workspace/gameserver/src/game/basedata/characters/minion';
import package1 from './package';
import type AttackableUnit from '@workspace/gameserver/src/gameobjects/units/attackable-unit';
import _Basicattack from '@workspace/gameserver/src/game/basedata/spells/basicattack';
//import BasicAttack from './spells/BasicAttack';


/**
 * @abstract
 */
export default class _Minion_Basic extends _Minion {
	static package = package1;

	id = MinionType.melee;

	static reward = {
		gold: 19,
		exp: 58.88,
	};
	static rewardPerLevel = {
		gold: 0.5,
		exp: 0,
	};

	static stats = {
		health: {
			baseValue: 455,
			perLevel: 20,
		},
		healthRegen: 0,
		mana: 0,
		manaRegen: 0,
		attackDamage: {
			baseValue: 12,
			perLevel: 1,
		},
		abilityPower: 0,
		attackSpeed: 1.25,
		attackSpeedOffset: 0,
		crit: 0,
		attackRange: 100,
		armor: {
			baseValue: 0,
			perLevel: 2,
		},
		resist: {
			baseValue: 0,
			perLevel: 1.25,
		},
		moveSpeed: 325,

		collisionRadius: 48,
	};

	static spells = {
		BasicAttack: _Basicattack,
	};

	get base() {
		return this.constructor as typeof _Minion_Basic;
	}

	constructor(owner: AttackableUnit) {
		super(owner);

		this.createOnSlots({
			[SlotId.A]: this.base.spells.BasicAttack,
		});
	}
}
