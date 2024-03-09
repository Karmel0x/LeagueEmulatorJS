
import { SlotId } from '@workspace/gameserver/src/constants/slot-id';
import _Monster from '@workspace/gameserver/src/game/basedata/characters/monster';
import package1 from './package';
import BasicAttack from './spells/BasicAttack';
import type AttackableUnit from '@workspace/gameserver/src/gameobjects/units/attackable-unit';


export default class Wolf extends _Monster {
	static package = package1;

	static reward = {
		gold: 8,
		exp: 25,
	};
	static rewardPerLevel = {
		gold: 0.11,
		exp: 0,
	};

	static stats = {
		health: {
			baseValue: 350,
			perLevel: 0,
		},
		healthRegen: 0,
		mana: 0,
		manaRegen: 0,
		attackDamage: {
			baseValue: 14,
			perLevel: 0,
		},
		abilityPower: 0,
		attackSpeed: 0.658,
		attackSpeedOffset: 0,
		crit: 0,
		attackRange: 100,
		armor: {
			baseValue: 6,
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
		return this.constructor as typeof Wolf;
	}

	constructor(owner: AttackableUnit) {
		super(owner);

		this.createOnSlots({
			[SlotId.A]: this.base.spells.BasicAttack,
		});
	}
}
