
const slotId = require("../../../../constants/slotId");
const _Minion = require("../../../datamethods/characters/_Minion");


/**
 * @abstract
 */
module.exports = class _Minion_MechMelee extends _Minion {
	static package = require('./package');

	static reward = {
		gold: 40,
		exp: 97,
	};
	static rewardPerLevel = {
		gold: 1,
		exp: 0,
	};

	static stats = {
		health: {
			baseValue: 1500,
			perLevel: 200,
		},
		healthRegen: 0,
		mana: 0,
		manaRegen: 0,
		attackDamage: {
			baseValue: 190,
			perLevel: 10,
		},
		attackSpeed: 0.694,
		attackSpeedOffset: 0,
		crit: 0,
		attackRange: 100,
		armor: 30,
		resist: -30,
		moveSpeed: 325,

		collisionRadius: 65,
	};

	static spells = {
		//BasicAttack: require('./spells/BasicAttack'),
	};

	constructor(parent) {
		super(parent);

		this.createOnSlots({
			[slotId.A]: this.constructor.spells.BasicAttack,
		});
	}
};
