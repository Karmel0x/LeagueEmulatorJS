
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import { MinionType } from '@repo/packets/base/s2c/0x03-Barrack_SpawnUnit';
import _Basicattack from '@repo/scripting/base/basicattack';
import Character from '@repo/scripting/base/character';
import package1 from './package';
//import BasicAttack from './spells/BasicAttack';


/**
 * @abstract
 */
export default class _Minion_Wizard extends Character {
	static package = package1;

	id = MinionType.archer;

	static reward = {
		gold: 14,
		exp: 29.44,
	};
	static rewardPerLevel = {
		gold: 0.4,
		exp: 0,
	};

	static stats = {
		health: 290,
		healthPerLevel: 15,
		healthRegen: 0,
		mana: 0,
		manaRegen: 0,
		attackDamage: 23,
		attackDamagePerLevel: 2,
		attackSpeed: 0.67,
		attackSpeedOffset: 0,
		crit: 0,
		attackRange: 600,
		armor: 0,
		armorPerLevel: 1.25,
		resist: 0,
		resistPerLevel: 2,
		moveSpeed: 325,

		collisionRadius: 48,
	};

	static spells = {
		[SlotId.a]: _Basicattack,
	};

	get base() {
		return this.constructor as typeof _Minion_Wizard;
	}

}
