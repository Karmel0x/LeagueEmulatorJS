
import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import _Basicattack from '@repo/gameserver/src/game/basedata/basicattack';
import Character from '@repo/gameserver/src/game/basedata/character';
import { MinionType } from '@repo/packets/base/s2c/0x03-Barrack_SpawnUnit';
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
		health: {
			baseValue: 455,
			perLevel: 20,
		},
		healthRegen: 0,
		mana: 0,
		manaRegen: 0,
		attackDamage: {
			baseValue: 12,
			perLevel: 1,
		},
		abilityPower: 0,
		attackSpeed: 1.25,
		attackSpeedOffset: 0,
		crit: 0,
		attackRange: 100,
		armor: {
			baseValue: 0,
			perLevel: 2,
		},
		resist: {
			baseValue: 0,
			perLevel: 1.25,
		},
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
