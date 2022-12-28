
const slotId = require("../../../../Constants/slotId");
const _Monster = require("../../../DataMethods/Characters/_Monster");


module.exports = class Wolf extends _Monster {
	static package = require('./package');

	static reward = {
		gold: 8,
		exp: 25,
	};
	static rewardPerLevel = {
		gold: 0.11,
		exp: 0,
	};

	static stats = {
		health: {
			baseValue: 350,
			perLevel: 0,
		},
		healthRegen: 0,
		mana: 0,
		manaRegen: 0,
		attackDamage: {
			baseValue: 14,
			perLevel: 0,
		},
		abilityPower: 0,
		attackSpeed: 0.658,
		attackSpeedOffset: 0,
		crit: 0,
		attackRange: 100,
		armor: {
			baseValue: 6,
			perLevel: 0,
		},
		resist: {
			baseValue: 0,
			perLevel: 0,
		},
		moveSpeed: 450,

		collisionRadius: 48,
	};

	static spells = {
		BasicAttack: require('./Spells/BasicAttack'),
	};

	constructor(parent){
		super(parent);
		
		this.createOnSlots({
			[slotId.A]: this.constructor.spells.BasicAttack,
		});
	}
};
