
const slotId = require('../../../../Constants/slotId');
const _Champion = require("../../../DataMethods/Characters/_Champion");

module.exports = class Yasuo extends _Champion {
	static package = require('./package');

	static stats = {
		moveSpeed: 340,
		attackRange: 175,
		health: 517.76,
		healthPerLevel: 82,
		mana: 60,
		manaPerLevel: 0,
		armor: 24.712,
		armorPerLevel: 3.4,
		resist: 30,
		resistPerLevel: 0,
		healthRegen: 6.51,
		healthRegenPerLevel: 0.9,
		manaRegen: 0,
		manaRegenPerLevel: 0,
		crit: 0,
		critPerLevel: 0,
		attackDamage: 55.376,
		attackDamagePerLevel: 3.2,
		attackSpeedOffset: -0.05,
		attackSpeed: 1,
		attackSpeedPerLevel: 3.2,
	};
	
	static spells = {
		//// Yasuo Q
		//YasuoQW: require('./Spells/YasuoQW'),
		//YasuoQ: require('./Spells/YasuoQ'),
		//YasuoQDamage: require('./Spells/YasuoQDamage'),
		//
		//// Yasuo Q2
		//YasuoQ2W: require('./Spells/YasuoQ2W'),
		//YasuoQ2: require('./Spells/YasuoQ2'),

		// Yasuo Q3
		YasuoQ3W: require('./Spells/YasuoQ3W'),
		YasuoQ3: require('./Spells/YasuoQ3'),
		YasuoQ3Mis: require('./Spells/YasuoQ3Mis'),


		YasuoWMovingWall: require('./Spells/YasuoWMovingWall'),
		YasuoDashWrapper: require('./Spells/YasuoDashWrapper'),
		YasuoRKnockUpComboW: require('./Spells/YasuoRKnockUpComboW'),

		YasuoBasicAttack: require('./Spells/YasuoBasicAttack'),
		//[slotId.BasicAttack2]: require('./Spells/YasuoBasicAttack2'),
		//[slotId.BasicAttack3]: require('./Spells/YasuoBasicAttack3'),
		//[slotId.BasicAttack4]: require('./Spells/YasuoBasicAttack4'),

		//[slotId.CritAttack]: require('./Spells/YasuoCritAttack'),
		//[slotId.CritAttack2]: require('./Spells/YasuoCritAttack2'),
		//[slotId.CritAttack3]: require('./Spells/YasuoCritAttack3'),
		//[slotId.CritAttack4]: require('./Spells/YasuoCritAttack4'),
	};

	constructor(parent){
		super(parent);
		
		this.createOnSlots({
			[slotId.Q]: this.constructor.spells.YasuoQ3W,
			[slotId.W]: this.constructor.spells.YasuoWMovingWall,
			[slotId.E]: this.constructor.spells.YasuoDashWrapper,
			[slotId.R]: this.constructor.spells.YasuoRKnockUpComboW,

			[slotId.A]: this.constructor.spells.YasuoBasicAttack,
		});
	}

	//static spellSlots = {
	//	[slotId.Q]: require('./Spells/YasuoQW'),
	//	[slotId.W]: require('./Spells/YasuoWMovingWall'),
	//	[slotId.E]: require('./Spells/YasuoDashWrapper'),
	//	[slotId.R]: require('./Spells/YasuoRKnockUpComboW'),
//
	//	[slotId.BasicAttack]: require('./Spells/YasuoBasicAttack'),
	//	//[slotId.BasicAttack2]: require('./Spells/YasuoBasicAttack2'),
	//	//[slotId.BasicAttack3]: require('./Spells/YasuoBasicAttack3'),
	//	//[slotId.BasicAttack4]: require('./Spells/YasuoBasicAttack4'),
//
	//	//[slotId.CritAttack]: require('./Spells/YasuoCritAttack'),
	//	//[slotId.CritAttack2]: require('./Spells/YasuoCritAttack2'),
	//	//[slotId.CritAttack3]: require('./Spells/YasuoCritAttack3'),
	//	//[slotId.CritAttack4]: require('./Spells/YasuoCritAttack4'),
	//};

};
