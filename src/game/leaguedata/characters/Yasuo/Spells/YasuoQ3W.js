
const slotId = require('../../../../../constants/slotId');
const _Spell = require("../../../../datamethods/spells/_Spell");
const PositionHelper = require("../../../../../functions/PositionHelper");

const package1 = require('../package');
const YasuoQ3 = require('./YasuoQ3');


module.exports = class YasuoQ3W extends _Spell {
	packageHash = package1.packageHash;
	spellSlot = slotId.Q;
	windup = 0;
	cooldown = 0;//5;
	manaCost = 0;

	castInfo = {
		target: [],
		designerCastTime: 0,
		designerTotalTime: 1.45,
	};

	static childSpellList = [
		YasuoQ3,
	];

	castRange = 1150;
	preCast(spellData) {
		if (this.owner.castingSpell)
			return false;

		if (this.owner.hasBuff("YasuoQ") || this.owner.hasBuff("YasuoQ2"))
			return false;

		return super.preCast(spellData);
	}

	onCast(spellData) {
		//spellData.position = PositionHelper.getPositionBetweenRange(this.owner, spellData.packet, this.castRange);
		spellData.anglePosition = PositionHelper.anglePosition(spellData.packet, this.owner);
		//spellData.target = Dummytarget({position: spellData.packet.position});

	}
};
