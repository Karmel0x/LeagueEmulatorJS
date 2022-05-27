
const slotId = require("../../../../../Constants/slotId");
const { HashString } = require("../../../../../Functions/HashString");
const PositionHelper = require("../../../../../Functions/PositionHelper");
const Skillshot = require("../../../../../GameObjects/Missiles/Skillshot");
const _Spell = require("../../../../DataMethods/Spells/_Spell");

const package1 = require('../package');
const EzrealEssenceFluxMissile = require("./EzrealEssenceFluxMissile");


class _Particle {
	// todo
	
}

class ezreal_bow_yellow extends _Particle {
	// todo

	PackageHash = package1.PackageHash;
	particleHash = HashString(this.constructor.name + '.troy');
	boneHash = HashString('L_HAND');

	onCast(spellData){
		
		this.owner.AddParticleTarget(this.PackageHash, this.particleHash, this.boneHash);
	}
	static tempOnCast(spellData, owner){
		var particleHash = HashString(this.constructor.name + '.troy');
		var boneHash = HashString('L_HAND');
		
		owner.AddParticleTarget(package1.PackageHash, particleHash, boneHash);
	}
}

module.exports = class EzrealEssenceFlux extends _Spell {
	PackageHash = package1.PackageHash;
	SpellSlot = slotId.W;

	CastInfo = {
		target: [],
		DesignerCastTime: 0.25,
		DesignerTotalTime: 1,
	};

	constructor(options){
		super(options);

		this.childSpells.push(new EzrealEssenceFluxMissile({...options, parentSpell: this}));
	}

	preCast(spellData){
		spellData.maxRangePosition = PositionHelper.getMaxRangePosition(this.owner, spellData.packet, this.castRange);

		var skillshot = Skillshot.create(this.owner, spellData.maxRangePosition, {
			speed: 1550, range: 1000, radius: 80
		});

		var collidedWith = [];
		skillshot.callbacks.collision._ = {
			options: {
				range: 80,
			},
			function: (target) => {
				if(skillshot.owner == target || collidedWith.includes(target.netId))
					return;
			
				collidedWith.push(target.netId);

				skillshot.owner.attack(target);
			},
		};

		spellData.missile = skillshot;
		return super.preCast(spellData);
	}
	onCast(spellData){
		super.onCast(spellData);
		ezreal_bow_yellow.tempOnCast(spellData, this.owner);

	}
};
