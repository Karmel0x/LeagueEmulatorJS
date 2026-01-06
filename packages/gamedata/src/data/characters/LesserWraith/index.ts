
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import Character from '@repo/scripting/base/character';
import package1 from './package';
import BasicAttack from './spells/BasicAttack';


export default class LesserWraith extends Character {
	static package = package1;

	static reward = {
		gold: 4,
		exp: 20,
	};
	static rewardPerLevel = {
		gold: 0.05,
		exp: 0.29,
	};

	static stats = {
		health: 250,
		healthPerLevel: 18,
		healthRegen: 0,
		mana: 0,
		manaRegen: 0,
		attackDamage: 12,
		attackDamagePerLevel: 0.33,
		abilityPower: 0,
		attackSpeed: 0.638,
		attackSpeedOffset: 0,
		crit: 0,
		attackRange: 100,
		armor: 5,
		armorPerLevel: 0,
		resist: 0,
		resistPerLevel: 0,
		moveSpeed: 330,

		collisionRadius: 48,
	};

	static spells = {
		[SlotId.a]: BasicAttack,
	};

	get base() {
		return this.constructor as typeof LesserWraith;
	}

}
