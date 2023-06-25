
const slotId = require("../../../../constants/slotId");
const _Monster = require("../../../datamethods/characters/_Monster");


module.exports = class Dragon extends _Monster {
	static package = require('./package');

	static reward = {
		gold: 25,
		exp: 150,
		globalGold: 180,
	};
	static rewardPerLevel = {
		gold: 0,
		exp: 40,
		globalGold: 10,
	};

	static stats = {
		health: {
			baseValue: 3500,
			perLevel: 240,
		},
		healthRegen: 0,
		mana: 0,
		manaRegen: 0,
		attackDamage: {
			baseValue: 110,
			perLevel: 0,
		},
		abilityPower: 0,
		attackSpeed: 0.658,
		attackSpeedOffset: 0,
		crit: 0,
		attackRange: 350,
		armor: {
			baseValue: 21,
			perLevel: 13,
		},
		resist: {
			baseValue: 30,
			perLevel: 5.85,
		},
		moveSpeed: 330,

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
