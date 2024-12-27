
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import _Basicattack from '@repo/gameserver/src/game/basedata/basicattack';
import Character from '@repo/gameserver/src/game/basedata/character';
import { MinionType } from '@repo/packets/base/s2c/0x03-Barrack_SpawnUnit';
import package1 from './package';
//import BasicAttack from './spells/BasicAttack';


/**
 * @abstract
 */
export default class _Minion_MechMelee extends Character {
	static package = package1;

	id = MinionType.super;

	static reward = {
		gold: 40,
		exp: 97,
	};
	static rewardPerLevel = {
		gold: 1,
		exp: 0,
	};

	static stats = {
		health: {
			baseValue: 1500,
			perLevel: 200,
		},
		healthRegen: 0,
		mana: 0,
		manaRegen: 0,
		attackDamage: {
			baseValue: 190,
			perLevel: 10,
		},
		attackSpeed: 0.694,
		attackSpeedOffset: 0,
		crit: 0,
		attackRange: 100,
		armor: 30,
		resist: -30,
		moveSpeed: 325,

		collisionRadius: 65,
	};

	static spells = {
		[SlotId.a]: _Basicattack,
	};

	get base() {
		return this.constructor as typeof _Minion_MechMelee;
	}

}
