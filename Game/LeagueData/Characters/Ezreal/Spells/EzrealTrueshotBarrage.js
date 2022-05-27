
const Skillshot = require("../../../../../GameObjects/Missiles/Skillshot");
const _Spell = require("../../../../DataMethods/Spells/_Spell");
const PositionHelper = require("../../../../../Functions/PositionHelper");
const { HashString } = require("../../../../../Functions/HashString");

const package1 = require('../package');
const slotId = require("../../../../../Constants/slotId");


module.exports = class EzrealTrueshotBarrage extends _Spell {
	PackageHash = package1.PackageHash;
	SpellSlot = slotId.R;

	castRange = 25000;

	CastInfo = {
		//SpellSlot: 45,
		DesignerCastTime: 1,
		DesignerTotalTime: 1,
	};

	preCast(spellData){
		spellData.maxRangePosition = PositionHelper.getMaxRangePosition(this.owner, spellData.packet, this.castRange);
		
		var skillshot = Skillshot.create(this.owner, spellData.maxRangePosition, {
			speed: 2000, range: 25000, radius: 160
		});
		spellData.missile = skillshot;
		return super.preCast(spellData);
	}
	onCast(spellData){
		super.onCast(spellData);

		this.owner.AddParticleTarget(this.PackageHash, HashString('Ezreal_bow_huge.troy'), HashString('L_HAND'));

		this.fireMissile(spellData.missile);
	}

	async fireMissile(missile){

		var windup = 1;//?
		await global.Utilities.wait(windup * 1000);
        missile.fire(missile.target);

		await global.Utilities.wait(windup * 1000 / 2);
	}
};
