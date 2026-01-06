
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import Character from '@repo/scripting/base/character';
import package1 from './package';
import BasicAttack from './spells/BasicAttack';


export default class Golem extends Character {
	static package = package1;

	static reward = {
		gold: 55,
		exp: 140,
	};
	static rewardPerLevel = {
		gold: 0.76,
		exp: 2,
	};

	static stats = {
		health: 1200,
		healthPerLevel: 48,
		healthRegen: 0,
		mana: 0,
		manaRegen: 0,
		attackDamage: 60,
		attackDamagePerLevel: 1.6,
		abilityPower: 0,
		attackSpeed: 0.613,
		attackSpeedOffset: 0,
		crit: 0,
		attackRange: 150,
		armor: 12,
		armorPerLevel: 0,
		resist: -10,
		resistPerLevel: 0,
		moveSpeed: 285,

		collisionRadius: 48,
	};

	static spells = {
		[SlotId.a]: BasicAttack,
	};

	get base() {
		return this.constructor as typeof Golem;
	}

}
