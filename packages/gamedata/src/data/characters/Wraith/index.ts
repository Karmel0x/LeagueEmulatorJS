
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import Character from '@repo/scripting/base/character';
import package1 from './package';
import BasicAttack from './spells/BasicAttack';


export default class Wraith extends Character {
	static package = package1;

	static reward = {
		gold: 35,
		exp: 90,
	};
	static rewardPerLevel = {
		gold: 0.47,
		exp: 0,
	};

	static stats = {
		health: {
			baseValue: 1000,
			perLevel: 0,
		},
		healthRegen: 0,
		mana: 0,
		manaRegen: 0,
		attackDamage: {
			baseValue: 35,
			perLevel: 0,
		},
		abilityPower: 0,
		attackSpeed: 0.638,
		attackSpeedOffset: 0,
		crit: 0,
		attackRange: 300,
		armor: {
			baseValue: 15,
			perLevel: 0,
		},
		resist: {
			baseValue: 0,
			perLevel: 0,
		},
		moveSpeed: 330,

		collisionRadius: 48,
	};

	static spells = {
		[SlotId.a]: BasicAttack,
	};

	get base() {
		return this.constructor as typeof Wraith;
	}

}
