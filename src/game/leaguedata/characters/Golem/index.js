
const slotId = require("../../../../constants/slotId");
const _Monster = require("../../../datamethods/characters/_Monster");


module.exports = class Golem extends _Monster {
	static package = require('./package');

	static reward = {
		gold: 55,
		exp: 140,
	};
	static rewardPerLevel = {
		gold: 0.76,
		exp: 2,
	};

	static stats = {
		health: {
			baseValue: 1200,
			perLevel: 48,
		},
		healthRegen: 0,
		mana: 0,
		manaRegen: 0,
		attackDamage: {
			baseValue: 60,
			perLevel: 1.6,
		},
		abilityPower: 0,
		attackSpeed: 0.613,
		attackSpeedOffset: 0,
		crit: 0,
		attackRange: 150,
		armor: {
			baseValue: 12,
			perLevel: 0,
		},
		resist: {
			baseValue: -10,
			perLevel: 0,
		},
		moveSpeed: 285,

		collisionRadius: 48,
	};

	static spells = {
		BasicAttack: require('./spells/BasicAttack'),
	};

	constructor(parent) {
		super(parent);

		this.createOnSlots({
			[slotId.A]: this.constructor.spells.BasicAttack,
		});
	}
};
