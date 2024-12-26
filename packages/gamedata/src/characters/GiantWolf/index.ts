
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import _Monster from '@repo/gameserver/src/game/basedata/characters/monster';
import package1 from './package';
import BasicAttack from './spells/BasicAttack';
import type AttackableUnit from '@repo/gameserver/src/gameobjects/units/attackable-unit';


export default class GiantWolf extends _Monster {
	static package = package1;

	static reward = {
		gold: 40,
		exp: 110,
	};
	static rewardPerLevel = {
		gold: 0.58,
		exp: 0,
	};

	static stats = {
		health: {
			baseValue: 1100,
			perLevel: 0,
		},
		healthRegen: 0,
		mana: 0,
		manaRegen: 0,
		attackDamage: {
			baseValue: 40,
			perLevel: 0,
		},
		abilityPower: 0,
		attackSpeed: 0.679,
		attackSpeedOffset: 0,
		crit: 0,
		attackRange: 150,
		armor: {
			baseValue: 9,
			perLevel: 0,
		},
		resist: {
			baseValue: 0,
			perLevel: 0,
		},
		moveSpeed: 450,

		collisionRadius: 48,
	};

	static spells = {
		BasicAttack,
	};

	get base() {
		return this.constructor as typeof GiantWolf;
	}

	constructor(owner: AttackableUnit) {
		super(owner);

		this.createOnSlots({
			[SlotId.A]: this.base.spells.BasicAttack,
		});
	}
}
