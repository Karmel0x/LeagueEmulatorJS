
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import Character from '@repo/scripting/base/character';
import package1 from './package';
import BasicAttack from './spells/BasicAttack';


export default class GiantWolf extends Character {
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
		[SlotId.a]: BasicAttack,
	};

	get base() {
		return this.constructor as typeof GiantWolf;
	}

}
