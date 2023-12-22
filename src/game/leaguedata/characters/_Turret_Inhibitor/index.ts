import _Turret from '../../../datamethods/characters/_Turret';
import package1 from './package';

/**
 * @abstract
 */
export default class _Turret_Inhibitor extends _Turret {
	static package = package1;

	static reward = {
		globalGold: 175,
		globalExp: 100,
	};

	static stats = {
		health: 1300,
		healthRegen: 0,
		mana: 0,
		manaRegen: 0,
		attackDamage: {
			baseValue: 190,
			perLevel: 4,
		},
		abilityPower: 0,
		attackSpeed: 1,
		attackSpeedOffset: 0,
		crit: 0,
		attackRange: 775,//750,
		armor: {
			baseValue: 67,
			perLevel: 1,
		},
		resist: {
			baseValue: 100,
			perLevel: 1,
		},
		moveSpeed: 0,
	};

	//static maxLevel = 30;
}
