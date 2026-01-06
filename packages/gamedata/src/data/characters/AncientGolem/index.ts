
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import Character from '@repo/scripting/base/character';
import package1 from './package';
import BasicAttack from './spells/AncientGolemBasicAttack';


export default class AncientGolem extends Character {
	static package = package1;

	static reward = {
		gold: 60,
		exp: 260,
	};
	static rewardPerLevel = {
		gold: 0,
		exp: 0,
	};

	static stats = {
		health: 1500,
		healthPerLevel: 0,
		healthRegen: 0,
		mana: 0,
		manaRegen: 0,
		attackDamage: 60,
		attackDamagePerLevel: 0,
		abilityPower: 0,
		attackSpeed: 0.613,
		attackSpeedOffset: 0,
		crit: 0,
		attackRange: 100,
		armor: 20,
		armorPerLevel: 0,
		resist: 0,
		resistPerLevel: 0,
		moveSpeed: 180,

		collisionRadius: 48,
	};

	static spells = {
		[SlotId.a]: BasicAttack,
	};

	get base() {
		return this.constructor as typeof AncientGolem;
	}

}
