
const slotId = require("../../../../../Constants/slotId");
const _Spell = require("../../../../DataMethods/Spells/_Spell");

const package1 = require('../package');


module.exports = class EzrealEssenceFluxMissile extends _Spell {
	PackageHash = package1.PackageHash;
	SpellSlot = slotId.Qq;

	isProjectile = true;
	
	onCast(spellData){
		//console.log(spellData.missile);
		spellData.missile.fire(spellData.missile.target);
	}
	
};
