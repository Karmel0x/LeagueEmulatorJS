
const Skillshot = require("../../../../../GameObjects/Missiles/Skillshot");
const _Spell = require("../../../../DataMethods/Spells/_Spell");
const PositionHelper = require("../../../../../Functions/PositionHelper");
const { HashString } = require("../../../../../Functions/HashString");

const package1 = require('../package');
const slotId = require("../../../../../Constants/slotId");


module.exports = class EzrealTrueshotBarrage extends _Spell {
	packageHash = package1.packageHash;
	spellSlot = slotId.R;

	castRange = 25000;

	castInfo = {
		//spellSlot: 45,
		designerCastTime: 1,
		designerTotalTime: 1,
	};

	preCast(spellData) {
		spellData.maxRangePosition = PositionHelper.getPositionBetweenRange(this.owner, spellData.packet, this.castRange);

		var skillshot = Skillshot.create(this.owner, spellData.maxRangePosition, {
			speed: 2000, range: 25000, radius: 160
		});

		var collidedWith = [];
		skillshot.callbacks.collision._ = {
			options: {
				range: skillshot.options.radius,
			},
			function: (target) => {
				if (skillshot.owner == target || collidedWith.includes(target.netId))
					return;

				collidedWith.push(target.netId);

				skillshot.owner.attack(target);
			},
		};

		spellData.missile = skillshot;
		return super.preCast(spellData);
	}
	onCast(spellData) {
		super.onCast(spellData);

		this.owner.AddParticleTarget(this.packageHash, HashString('Ezreal_bow_huge.troy'), HashString('L_HAND'));

		this.fireMissile(spellData.missile);
	}

	async fireMissile(missile) {

		var windup = 1;//?
		await Promise.wait(windup * 1000);
		missile.fire(missile.target);

		await Promise.wait(windup * 1000 / 2);
	}
};
