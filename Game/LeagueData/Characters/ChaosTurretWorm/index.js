
const slotId = require('../../../../Constants/slotId');
const Turret3 = require("../Turret3");


module.exports = class ChaosTurretWorm extends Turret3 {
	static package = require('./package');

	static stats = {
		moveSpeed: 0,
		attackRange: 750,
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

		acquisitionRange: 750,
	};

	static spells = {
		ChaosTurretWormBasicAttack: require("./Spells/ChaosTurretWormBasicAttack"),
	};

	constructor(parent){
		super(parent);
		
		this.createOnSlots({
			[slotId.A]: this.constructor.spells.ChaosTurretWormBasicAttack,
		});
	}
};
