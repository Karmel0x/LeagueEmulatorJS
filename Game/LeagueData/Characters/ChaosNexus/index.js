
const _Character = require('../../../DataMethods/Characters/_Character');


module.exports = class ChaosNexus extends _Character {
	//static package = require('./package');

	static stats = {
		moveSpeed: 0,
		attackRange: 0,
		health: 500,
		healthPerLevel: 0,
		mana: 0,
		manaPerLevel: 0,
		armor: 0,
		armorPerLevel: 0,
		resist: 0,
		resistPerLevel: 0,
		healthRegen: 0,
		healthRegenPerLevel: 0,
		manaRegen: 0,
		manaRegenPerLevel: 0,
		crit: 0,
		critPerLevel: 0,
		attackDamage: 0,
		attackDamagePerLevel: 0,
		attackSpeedOffset: 0,
		attackSpeed: 0,
		attackSpeedPerLevel: 0,
		collisionRadius: 200,
	};

	static spells = {
		
	};

	constructor(parent){
		super(parent);
		
	}
};
