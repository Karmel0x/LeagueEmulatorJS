
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import Character from '@repo/gameserver/src/game/basedata/character';
import package1 from './package';
import BasicAttack from './spells/BasicAttack';


export default class Dragon extends Character {
	static package = package1;

	static reward = {
		gold: 25,
		exp: 150,
		globalGold: 180,
	};
	static rewardPerLevel = {
		gold: 0,
		exp: 40,
		globalGold: 10,
	};

	static stats = {
		health: {
			baseValue: 3500,
			perLevel: 240,
		},
		healthRegen: 0,
		mana: 0,
		manaRegen: 0,
		attackDamage: {
			baseValue: 110,
			perLevel: 0,
		},
		abilityPower: 0,
		attackSpeed: 0.658,
		attackSpeedOffset: 0,
		crit: 0,
		attackRange: 350,
		armor: {
			baseValue: 21,
			perLevel: 13,
		},
		resist: {
			baseValue: 30,
			perLevel: 5.85,
		},
		moveSpeed: 330,

		collisionRadius: 48,
	};

	static spells = {
		[SlotId.a]: BasicAttack,
	};

	get base() {
		return this.constructor as typeof Dragon;
	}

}
