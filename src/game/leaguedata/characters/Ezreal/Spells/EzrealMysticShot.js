
const HashString = require("../../../../../functions/HashString");
const PositionHelper = require("../../../../../gameobjects/extensions/Measure");
const Skillshot = require("../../../../../gameobjects/missiles/Skillshot");
const _Spell = require("../../../../datamethods/spells/_Spell");
const EzrealMysticShotMissile = require("./EzrealMysticShotMissile");

const package1 = require('../package');
const slotId = require("../../../../../constants/slotId");


module.exports = class EzrealMysticShot extends _Spell {
	packageHash = package1.packageHash;
	spellSlot = slotId.Q;

	castInfo = {
		target: [],
		designerCastTime: 0.25,
		designerTotalTime: 1,
		//cooldown: 6,
		//manaCost: 28,
	};

	static childSpellList = [
		EzrealMysticShotMissile,
	];

	preCast(spellData) {
		spellData.maxRangePosition = PositionHelper.getPositionBetweenRange(this.owner, spellData.packet, this.castRange);

		let skillshot = Skillshot.create(this.owner, spellData.maxRangePosition, {
			speed: 2000, range: 1150, radius: 60
		});

		spellData.missile = skillshot;
		return super.preCast(spellData);
	}

	onCast(spellData) {
		super.onCast(spellData);

		this.owner.packets.AddParticleTarget(this.packageHash, HashString.HashString('ezreal_bow.troy'), HashString.HashString('L_HAND'));

	}
};
