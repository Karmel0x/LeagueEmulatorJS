
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import Character from '@repo/scripting/base/character';
import package1 from './package';
import BasicAttack from './spells/BasicAttack';


export default class SmallGolem extends Character {
	static package = package1;

	static reward = {
		gold: 15,
		exp: 40,
	};
	static rewardPerLevel = {
		gold: 0.23,
		exp: 0.58,
	};

	static stats = {
		health: {
			baseValue: 450,
			perLevel: 37,
		},
		healthRegen: 0,
		mana: 0,
		manaRegen: 0,
		attackDamage: {
			baseValue: 30,
			perLevel: 1.3,
		},
		abilityPower: 0,
		attackSpeed: 0.613,
		attackSpeedOffset: 0,
		crit: 0,
		attackRange: 150,
		armor: {
			baseValue: 12,
			perLevel: 0,
		},
		resist: {
			baseValue: -10,
			perLevel: 0,
		},
		moveSpeed: 285,

		collisionRadius: 48,
	};

	static spells = {
		[SlotId.a]: BasicAttack,
	};

	get base() {
		return this.constructor as typeof SmallGolem;
	}

}
