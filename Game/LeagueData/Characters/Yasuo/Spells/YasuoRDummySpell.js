
const _Spell = require("../../../../DataMethods/Spells/_Spell");
const TempYasuoRMissile = require("./TempYasuoRMissile");
const Skillshot = require("../../../../../GameObjects/Missiles/Skillshot");
const slotId = require("../../../../../Constants/slotId");


module.exports = class YasuoRDummySpell extends _Spell {

	spellSlot = slotId.Qm;

	CastInfo = {
		DesignerCastTime: -1,
		DesignerTotalTime: 0.7,
	};

	constructor(options){
		super(options);

		this.childSpells.push(new TempYasuoRMissile({...options, parentSpell: this}));
	}

	onCast(spellData){
		
		spellData.spellCast._CastInfo.target = [{
			unit: this.owner.netId,
			hitResult: 1,
		}];
		
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
				if(skillshot.owner == target || collidedWith.includes(target))
					return;
				
				collidedWith.push(target);
				
				skillshot.owner.attack(target);
				//if(target.knockUp)
				//	target.knockUp({
				//		duration: 0.75,
				//		ParabolicGravity: 16.5,
				//		Facing: 1,
				//	});
			},
		};
		this.collidedWith = collidedWith;
		
		spellData.missile = skillshot;
	}
};
