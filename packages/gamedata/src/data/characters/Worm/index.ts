
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import Character from '@repo/scripting/base/character';
import package1 from './package';
import BasicAttack from './spells/BasicAttack';


export default class Worm extends Character {
	static package = package1;

	static reward = {
		gold: 25,
		exp: 800,
		globalGold: 300,
		globalExp: 600,
	};
	static rewardPerLevel = {
		gold: 0,
		exp: 0,
	};

	static stats = {
		health: {
			baseValue: 8800,
			perLevel: 140,
		},
		healthRegen: 0,
		mana: 0,
		manaRegen: 0,
		attackDamage: {
			baseValue: 460,
			perLevel: 0,
		},
		abilityPower: 0,
		attackSpeed: 0.208,
		attackSpeedOffset: 0,
		crit: 0,
		attackRange: 955,
		armor: {
			baseValue: 120,
			perLevel: 0,
		},
		resist: {
			baseValue: 70,
			perLevel: 0,
		},
		moveSpeed: 0,

		collisionRadius: 48,
	};

	static spells = {
		[SlotId.a]: BasicAttack,
	};

	get base() {
		return this.constructor as typeof Worm;
	}

}
