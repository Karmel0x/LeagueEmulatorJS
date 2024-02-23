import _Turret from '@workspace/gameserver/src/game/datamethods/characters/_Turret';
import package1 from './package';

/**
 * @abstract
 */
export default class _Turret_Nexus extends _Turret {
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
		attackDamage: {
			baseValue: 180,
			perLevel: 4,
		},
		abilityPower: 0,
		attackSpeed: 1,
		attackSpeedOffset: 0,
		crit: 0,
		attackRange: 775,//750,
		armor: {
			baseValue: 65,
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
