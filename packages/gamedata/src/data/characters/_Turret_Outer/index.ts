import { SlotId } from '@repo/gameserver/src/constants/slot-id';
import Character from '@repo/scripting/base/character';
import package1 from './package';
import _Turret_OuterBasicAttack from './spells/_Turret_OuterBasicAttack';

/**
 * @abstract
 */
export default class _Turret_Outer extends Character {
	static package = package1;

	static spells = {
		[SlotId.a]: _Turret_OuterBasicAttack,
	};

	static reward = {
		splittedGold: 150,
		globalGold: 100,
	};

	static stats = {
		health: 1300,
		healthRegen: 0,
		mana: 0,
		manaRegen: 0,
		attackDamage: 152,
		attackDamagePerLevel: 4,
		abilityPower: 0,
		attackSpeed: 1,
		attackSpeedOffset: 0,
		crit: 0,
		attackRange: 775,//750,
		armor: 60,
		resist: 100,
		resistPerLevel: 1,
		moveSpeed: 0,
	};

	//static maxLevel = 7;
}
