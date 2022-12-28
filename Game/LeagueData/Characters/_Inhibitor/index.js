
const _Character = require('../../../DataMethods/Characters/_Character');


/**
 * @abstract
 */
module.exports = class _Inhibitor extends _Character {
	//static package = require('./package');

	static reward = {
		gold: 50,
	};

	static stats = {
		health: 400,//4000
		healthRegen: 15,
		mana: 0,
		manaRegen: 0,
		attackDamage: 0,
		abilityPower: 0,
		attackSpeed: 0,
		attackSpeedOffset: 0,
		crit: 0,
		attackRange: 0,
		armor: 20,
		resist: 0,
		moveSpeed: 0,

		collisionRadius: 100,//??
	};

	static spells = {

	};

	constructor(parent) {
		super(parent);

	}
};
