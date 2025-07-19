import Character from '@repo/scripting/base/character';
import package1 from './package';

/**
 * @abstract
 */
export default class _Turret_Fountain extends Character {
	static package = package1;

	static reward = {
		globalGold: 100,
		globalExp: 400,
	};

	static stats = {
		health: 9999,
		healthRegen: 0,
		mana: 0,
		manaRegen: 0,
		attackDamage: 999,
		abilityPower: 0,
		attackSpeed: 1.6,
		attackSpeedOffset: 0,
		crit: 0,
		attackRange: 1250,
		armor: 0,
		resist: 0,
		moveSpeed: 0,
	};

}
