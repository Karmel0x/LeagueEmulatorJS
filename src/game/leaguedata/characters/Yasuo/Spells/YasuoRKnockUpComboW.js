
const PositionHelper = require("../../../../../gameobjects/extensions/Measure");
const _Spell = require("../../../../datamethods/spells/_Spell");
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
