
const slotId = require("../../../../constants/slotId");
const _Monster = require("../../../datamethods/characters/_Monster");


module.exports = class GiantWolf extends _Monster {
	static package = require('./package');

	static reward = {
		gold: 40,
		exp: 110,
	};
	static rewardPerLevel = {
		gold: 0.58,
		exp: 0,
	};

	static stats = {
		health: {
			baseValue: 1100,
			perLevel: 0,
		},
		healthRegen: 0,
		mana: 0,
		manaRegen: 0,
		attackDamage: {
			baseValue: 40,
			perLevel: 0,
		},
		abilityPower: 0,
		attackSpeed: 0.679,
		attackSpeedOffset: 0,
		crit: 0,
		attackRange: 150,
		armor: {
			baseValue: 9,
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
		BasicAttack: require('./spells/BasicAttack'),
	};

	constructor(parent) {
		super(parent);

		this.createOnSlots({
			[slotId.A]: this.constructor.spells.BasicAttack,
		});
	}
};
