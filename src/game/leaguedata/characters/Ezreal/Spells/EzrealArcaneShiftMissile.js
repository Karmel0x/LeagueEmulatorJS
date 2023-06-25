
const slotId = require("../../../../../constants/slotId");
const _Spell = require("../../../../datamethods/spells/_Spell");

const package1 = require('../package');


module.exports = class EzrealArcaneShiftMissile extends _Spell {
	packageHash = package1.packageHash;
	spellSlot = slotId.Qq;

	isProjectile = true;

	onCast(spellData) {

	}
};
