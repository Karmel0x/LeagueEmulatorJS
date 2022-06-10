
const slotId = require('../../../../../Constants/slotId');
const Skillshot = require("../../../../../GameObjects/Missiles/Skillshot");
const _Spell = require("../../../../DataMethods/Spells/_Spell");
const package1 = require('../package');
const YasuoQ3Mis = require("./YasuoQ3Mis");


module.exports = class YasuoQ3 extends _Spell {
	packageHash = package1.packageHash;
	spellSlot = slotId.Qq;
	windup = 0.166;

	castInfo = {
		designerCastTime: 0.35,
		designerTotalTime: 0.5,
		bitfield: {
			isOverrideCastPosition: true,
		},

		// facing is not working without these two ??
		spellSlot: 0,
		target: [],
		//spellSlot: 46,// <- original packet
		//target: [{ unit: this.owner.netId, hitResult: 0 }],// <- original packet

	};
	constructor(options){
		super(options);

		this.childSpells.push(new YasuoQ3Mis({...options, parentSpell: this}));
	}

	onCast(spellData){
		super.onCast(spellData);
		
		var skillshotTargetPosition = spellData.anglePosition.add(this.owner.position);
		var skillshot = Skillshot.create(this.owner, skillshotTargetPosition, {
			speed: 1200, range: 1150, radius: 90
		});

		var collidedWith = [];
		skillshot.callbacks.collision._ = {
			options: {
				range: skillshot.options.radius,
			},
			function: (target) => {
				if(skillshot.owner == target || collidedWith.includes(target.netId))
					return;
				
				collidedWith.push(target.netId);
				
				skillshot.owner.attack(target);
				if(target.knockUp)
					target.knockUp({
						duration: 0.75,
						parabolicGravity: 16.5,
						facing: 1,
					});
			},
		};
		spellData.missile = skillshot;

	}
};
