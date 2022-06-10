
const slotId = require('../../../../../Constants/slotId');
const _Spell = require("../../../../DataMethods/Spells/_Spell");
const package1 = require('../package');


module.exports = class YasuoQ3Mis extends _Spell {
	packageHash = package1.packageHash;
	spellSlot = slotId.Qm;
	windup = 0.3;
	isProjectile = true;

	castInfo = {
		designerTotalTime: 1,
		bitfield: {
			isForceCastingOrChannel: true,
		},
		ammoUsed: 0,
		target: [],
	};

	onCast(spellData){
		//console.log(spellData.missile);
		spellData.missile.fire(spellData.missile.target);
	}
};
