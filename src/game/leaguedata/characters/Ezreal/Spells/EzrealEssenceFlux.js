
const slotId = require("../../../../../constants/slotId");
const HashString = require("../../../../../functions/HashString");
const PositionHelper = require("../../../../../gameobjects/extensions/Measure");
const Skillshot = require("../../../../../gameobjects/missiles/Skillshot");
const _Spell = require("../../../../datamethods/spells/_Spell");

const package1 = require('../package');
const EzrealEssenceFluxMissile = require("./EzrealEssenceFluxMissile");


class _Particle {
	// todo

}

class ezreal_bow_yellow extends _Particle {
	// todo

	packageHash = package1.packageHash;
	particleHash = HashString.HashString(this.constructor.name + '.troy');
	boneHash = HashString.HashString('L_HAND');

	onCast(spellData) {

		this.owner.packets.AddParticleTarget(this.packageHash, this.particleHash, this.boneHash);
	}
	static tempOnCast(spellData, owner) {
		let particleHash = HashString.HashString(this.constructor.name + '.troy');
		let boneHash = HashString.HashString('L_HAND');

		owner.packets.AddParticleTarget(package1.packageHash, particleHash, boneHash);
	}
}

module.exports = class EzrealEssenceFlux extends _Spell {
	packageHash = package1.packageHash;
	spellSlot = slotId.W;

	castInfo = {
		target: [],
		designerCastTime: 0.25,
		designerTotalTime: 1,
	};

	static childSpellList = [
		EzrealEssenceFluxMissile,
	];

	preCast(spellData) {
		spellData.maxRangePosition = PositionHelper.getPositionBetweenRange(this.owner, spellData.packet, this.castRange);

		let skillshot = Skillshot.create(this.owner, spellData.maxRangePosition, {
			speed: 1550, range: 1000, radius: 80
		});

		/** @type {number[]} */
		let collidedWith = [];
		skillshot.callbacks.collision._ = {
			options: {
				range: 80,
			},
			function: (target) => {
				if (skillshot.owner == target || collidedWith.includes(target.netId))
					return;

				collidedWith.push(target.netId);

				skillshot.owner.combat.attack(target);
			},
		};

		spellData.missile = skillshot;
		return super.preCast(spellData);
	}
	onCast(spellData) {
		super.onCast(spellData);
		ezreal_bow_yellow.tempOnCast(spellData, this.owner);

	}
};
