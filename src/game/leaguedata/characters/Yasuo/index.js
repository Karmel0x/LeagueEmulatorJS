
const slotId = require('../../../../constants/slotId');
const _Champion = require("../../../datamethods/characters/_Champion");

module.exports = class Yasuo extends _Champion {
	static package = require('./package');

	static stats = {
		health: {
			baseValue: 380,
			perLevel: 82,
		},
		healthRegen: {
			baseValue: 5,
			perLevel: 0.9,
		},
		mana: 0,
		manaRegen: 0,
		attackDamage: {
			baseValue: 50,
			perLevel: 3.2,
		},
		abilityPower: 0,
		attackSpeed: {
			baseValue: 0.658,
			perLevel: 0,//3.2%
		},
		attackSpeedOffset: 0,
		crit: 0,
		attackRange: 175,
		armor: {
			baseValue: 19,
			perLevel: 3.4,
		},
		resist: 30,
		moveSpeed: 340,
	};

	static spells = {
		//// Yasuo Q
		//YasuoQW: require('./spells/YasuoQW'),
		//YasuoQ: require('./spells/YasuoQ'),
		//YasuoQDamage: require('./spells/YasuoQDamage'),
		//
		//// Yasuo Q2
		//YasuoQ2W: require('./spells/YasuoQ2W'),
		//YasuoQ2: require('./spells/YasuoQ2'),

		// Yasuo Q3
		YasuoQ3W: require('./spells/YasuoQ3W'),
		YasuoQ3: require('./spells/YasuoQ3'),
		YasuoQ3Mis: require('./spells/YasuoQ3Mis'),


		YasuoWMovingWall: require('./spells/YasuoWMovingWall'),
		YasuoDashWrapper: require('./spells/YasuoDashWrapper'),
		YasuoRKnockUpComboW: require('./spells/YasuoRKnockUpComboW'),

		YasuoBasicAttack: require('./spells/YasuoBasicAttack'),
		//[slotId.BasicAttack2]: require('./spells/YasuoBasicAttack2'),
		//[slotId.BasicAttack3]: require('./spells/YasuoBasicAttack3'),
		//[slotId.BasicAttack4]: require('./spells/YasuoBasicAttack4'),

		//[slotId.CritAttack]: require('./spells/YasuoCritAttack'),
		//[slotId.CritAttack2]: require('./spells/YasuoCritAttack2'),
		//[slotId.CritAttack3]: require('./spells/YasuoCritAttack3'),
		//[slotId.CritAttack4]: require('./spells/YasuoCritAttack4'),
	};

	constructor(parent) {
		super(parent);

		this.createOnSlots({
			[slotId.Q]: this.constructor.spells.YasuoQ3W,
			[slotId.W]: this.constructor.spells.YasuoWMovingWall,
			[slotId.E]: this.constructor.spells.YasuoDashWrapper,
			[slotId.R]: this.constructor.spells.YasuoRKnockUpComboW,

			[slotId.A]: this.constructor.spells.YasuoBasicAttack,
		});
	}

	//static slots = {
	//	[slotId.Q]: require('./spells/YasuoQW'),
	//	[slotId.W]: require('./spells/YasuoWMovingWall'),
	//	[slotId.E]: require('./spells/YasuoDashWrapper'),
	//	[slotId.R]: require('./spells/YasuoRKnockUpComboW'),
	//
	//	[slotId.BasicAttack]: require('./spells/YasuoBasicAttack'),
	//	//[slotId.BasicAttack2]: require('./spells/YasuoBasicAttack2'),
	//	//[slotId.BasicAttack3]: require('./spells/YasuoBasicAttack3'),
	//	//[slotId.BasicAttack4]: require('./spells/YasuoBasicAttack4'),
	//
	//	//[slotId.CritAttack]: require('./spells/YasuoCritAttack'),
	//	//[slotId.CritAttack2]: require('./spells/YasuoCritAttack2'),
	//	//[slotId.CritAttack3]: require('./spells/YasuoCritAttack3'),
	//	//[slotId.CritAttack4]: require('./spells/YasuoCritAttack4'),
	//};

};
