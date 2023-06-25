
const _Spell = require("../../../../datamethods/spells/_Spell");
const EzrealArcaneShiftMissile = require("./EzrealArcaneShiftMissile");

const package1 = require('../package');
const slotId = require("../../../../../constants/slotId");


module.exports = class EzrealArcaneShift extends _Spell {
	packageHash = package1.packageHash;
	spellSlot = slotId.E;
	movingSpell = true;

	static childSpellList = [
		EzrealArcaneShiftMissile,
	];

	preCast(spellData) {

		spellData.position = spellData.packet.position;
		return super.preCast(spellData);
	}
	onCast(spellData) {
		super.onCast(spellData);

		this.owner.dashTo(spellData.packet.position, { speed: 1800, range: 400 });

	}
};
