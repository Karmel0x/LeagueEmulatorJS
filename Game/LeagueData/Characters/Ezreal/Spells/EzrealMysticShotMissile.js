
const slotId = require("../../../../../Constants/slotId");
const _Spell = require("../../../../DataMethods/Spells/_Spell");

const package1 = require('../package');


module.exports = class EzrealMysticShotMissile extends _Spell {
	packageHash = package1.packageHash;
	isProjectile = true;
	spellSlot = slotId.Qm;

	castInfo = {
		target: [],
		designerTotalTime: 1,
		//cooldown: 2.1903247880352632e-39,
		ammoUsed: 0,
	};
	projectileData = {
		speed: 2000,
	};


	onCast(spellData) {
		//console.log(spellData.missile);
		spellData.missile.fire(spellData.missile.target);
	}

};
