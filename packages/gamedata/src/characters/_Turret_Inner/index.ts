import _Building from '@repo/gameserver/src/game/basedata/characters/building';
import package1 from './package';

/**
 * @abstract
 */
export default class _Turret_Inner extends _Building {
	static package = package1;

	static reward = {
		splittedGold: 100,
		globalGold: 125,
		globalExp: 30,
	};

	static stats = {
		health: 1300,
		healthRegen: 0,
		mana: 0,
		manaRegen: 0,
		attackDamage: {
			baseValue: 170,
			perLevel: 4,
		},
		abilityPower: 0,
		attackSpeed: 1,
		attackSpeedOffset: 0,
		crit: 0,
		attackRange: 775,//750,
		armor: {
			baseValue: 60,
			perLevel: 1,
		},
		resist: {
			baseValue: 100,
			perLevel: 1,
		},
		moveSpeed: 0,
	};

	//static maxLevel = 20;
}
