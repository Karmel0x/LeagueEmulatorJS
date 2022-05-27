
const slotId = require('../../../../../Constants/slotId');
const _Spell = require("../../../../DataMethods/Spells/_Spell");
const package1 = require('../package');


module.exports = class YasuoQ3Mis extends _Spell {
	PackageHash = package1.PackageHash;
	spellSlot = slotId.Qm;
	windup = 0.3;
	isProjectile = true;

	CastInfo = {
		DesignerTotalTime: 1,
		bitfield: {
			IsForceCastingOrChannel: true,
		},
		AmmoUsed: 0,
		target: [],
	};

	onCast(spellData){
		//console.log(spellData.missile);
		spellData.missile.fire(spellData.missile.target);
	}
};
