
const _Character = require('../../../DataMethods/Characters/_Character');


module.exports = class _Nexus extends _Character {
	//static package = require('./package');

	static stats = {
		health: 550,//5500
		healthRegen: 0,
		mana: 0,
		manaRegen: 0,
		attackDamage: 0,
		abilityPower: 0,
		attackSpeed: 0,
		attackSpeedOffset: 0,
		crit: 0,
		attackRange: 0,
		armor: 0,
		resist: 0,
		moveSpeed: 0,
		
		collisionRadius: 200,
	};

	static spells = {
		
	};

	constructor(parent){
		super(parent);
		
	}
};
