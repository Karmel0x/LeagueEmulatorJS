const _Minion = require("../../../DataMethods/Characters/_Minion");


/**
 * @abstract
 */
module.exports = class Minion_Basic extends _Minion {
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
		//[SpellSlot.BasicAttack]: require('./Spells/BasicAttack'),
	};

};
