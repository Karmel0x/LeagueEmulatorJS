
const slotId = require("../../../../../Constants/slotId");
const _Spell = require("../../../../DataMethods/Spells/_Spell");

const package1 = require('../package');


module.exports = class EzrealMysticShotMissile extends _Spell {
	PackageHash = package1.PackageHash;
	isProjectile = true;
	SpellSlot = slotId.Qm;

	CastInfo = {
		target: [],
		DesignerTotalTime: 1,
		//Cooldown: 2.1903247880352632e-39,
		AmmoUsed: 0,
	};
	projectileData = {
		speed: 2000,
	};

	
	onCast(spellData){
		//console.log(spellData.missile);
		spellData.missile.fire(spellData.missile.target);
	}
	
};
