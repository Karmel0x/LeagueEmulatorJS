
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import { MinionType } from '@repo/packets/base/s2c/0x03-Barrack_SpawnUnit';
import _Basicattack from '@repo/scripting/base/basicattack';
import Character from '@repo/scripting/base/character';
import package1 from './package';
//import BasicAttack from './spells/BasicAttack';


/**
 * @abstract
 */
export default class _Minion_Basic extends Character {
	static package = package1;

	id = MinionType.melee;

	static reward = {
		gold: 19,
		exp: 58.88,
	};
	static rewardPerLevel = {
		gold: 0.5,
		exp: 0,
	};

	static stats = {
		health: 455,
		healthPerLevel: 20,
		healthRegen: 0,
		mana: 0,
		manaRegen: 0,
		attackDamage: 12,
		attackDamagePerLevel: 1,
		abilityPower: 0,
		attackSpeed: 1.25,
		attackSpeedOffset: 0,
		crit: 0,
		attackRange: 100,
		armor: 0,
		armorPerLevel: 2,
		resist: 0,
		resistPerLevel: 1.25,
		moveSpeed: 325,

		collisionRadius: 48,
	};

	static spells = {
		[SlotId.a]: _Basicattack,
	};

	get base() {
		return this.constructor as typeof _Minion_Basic;
	}

}
