const _Turret = require('../../../DataMethods/Characters/_Turret');

/**
 * @abstract
 */
module.exports = class _OuterTurret extends _Turret {
	static package = require('./package');

	static stats = {
		health: 2550,
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
		attackRange: 775,
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

};
