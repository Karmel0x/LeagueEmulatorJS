
const slotId = require("../../../../Constants/slotId");
const _Monster = require("../../../DataMethods/Characters/_Monster");


module.exports = class LesserWraith extends _Monster {
	static package = require('./package');

	static reward = {
		gold: 4,
		exp: 20,
	};
	static rewardPerLevel = {
		gold: 0.05,
		exp: 0.29,
	};

	static stats = {
		health: {
			baseValue: 250,
			perLevel: 18,
		},
		healthRegen: 0,
		mana: 0,
		manaRegen: 0,
		attackDamage: {
			baseValue: 12,
			perLevel: 0.33,
		},
		abilityPower: 0,
		attackSpeed: 0.638,
		attackSpeedOffset: 0,
		crit: 0,
		attackRange: 100,
		armor: {
			baseValue: 5,
			perLevel: 0,
		},
		resist: {
			baseValue: 0,
			perLevel: 0,
		},
		moveSpeed: 330,

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
