
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import Character from '@repo/gameserver/src/game/basedata/character';
import package1 from './package';
import BasicAttack from './spells/BasicAttack';


export default class Wolf extends Character {
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
		[SlotId.a]: BasicAttack,
	};

	get base() {
		return this.constructor as typeof Wolf;
	}

}
