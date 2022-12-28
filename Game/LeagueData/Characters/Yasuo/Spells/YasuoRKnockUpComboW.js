
const PositionHelper = require("../../../../../Functions/PositionHelper");
const _Spell = require("../../../../DataMethods/Spells/_Spell");
const YasuoRDummySpell = require("./YasuoRDummySpell");


module.exports = class YasuoRKnockUpComboW extends _Spell {
	castRange = 1200;

	static childSpellList = [
		YasuoRDummySpell,
	];

	collidedWith = [];
	onCast(spellData) {
		super.onCast(spellData);

		spellData.anglePosition = PositionHelper.anglePosition(spellData.packet, this.owner);
	}
};
