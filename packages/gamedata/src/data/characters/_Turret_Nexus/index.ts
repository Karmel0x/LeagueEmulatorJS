import Character from '@repo/scripting/base/character';
import package1 from './package';

/**
 * @abstract
 */
export default class _Turret_Nexus extends Character {
	static package = package1;

	static reward = {
		globalGold: 150,
		globalExp: 120,
	};

	static stats = {
		health: 1300,
		healthRegen: 0,
		mana: 0,
		manaRegen: 0,
		attackDamage: 180,
		attackDamagePerLevel: 4,
		abilityPower: 0,
		attackSpeed: 1,
		attackSpeedOffset: 0,
		crit: 0,
		attackRange: 775,//750,
		armor: 65,
		armorPerLevel: 1,
		resist: 100,
		resistPerLevel: 1,
		moveSpeed: 0,
	};

	//static maxLevel = 30;
}
