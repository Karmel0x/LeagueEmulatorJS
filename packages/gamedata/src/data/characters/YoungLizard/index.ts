
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import Character from '@repo/scripting/base/character';
import package1 from './package';
import BasicAttack from './spells/YoungLizardBasicAttack';


export default class YoungLizard extends Character {
	static package = package1;

	static reward = {
		gold: 7,
		exp: 20,
	};
	static rewardPerLevel = {
		gold: 1,
		exp: 0.14,
	};

	static stats = {
		health: 400,
		healthPerLevel: 0,
		healthRegen: 0,
		mana: 0,
		manaRegen: 0,
		attackDamage: 12,
		attackDamagePerLevel: 0,
		abilityPower: 0,
		attackSpeed: 0.679,
		attackSpeedOffset: 0,
		crit: 0,
		attackRange: 500,
		armor: 8,
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
		return this.constructor as typeof YoungLizard;
	}

}
