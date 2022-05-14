const _Spellchain = require("../../_Spellchain");
const _Yasuo = require("../_Yasuo");
const Skillshot = require("../../../../Attacks/Missiles/Skillshot");
const Targetedshot = require("../../../../Attacks/Missiles/Targetedshot");
const _Spell = require("../../_Spell");
const SpellSlot = require("../../../../../Constants/SpellSlot");


class YasuoQ3Mis extends _Spell {
	spellSlot = SpellSlot.Qm;
	windup = 0.3;
	shot(){
		
	}
	customCastInfo(CastInfo){
		CastInfo.DesignerTotalTime = 1;
		CastInfo.bitfield = {
			IsForceCastingOrChannel: true,
		};
		CastInfo.AmmoUsed = 0;
	}

};
class YasuoQ3 extends _Spell {
	spellSlot = SpellSlot.Qq;
	windup = 0.166;
	shot(){
		
	}
	customCastInfo(CastInfo){
		CastInfo.DesignerCastTime = 0.35;
		CastInfo.DesignerTotalTime = 0.5;
		CastInfo.bitfield = {
			IsOverrideCastPosition: true,
		};


		//console.log(CastInfo);
		// facing is not working without these two ??
		CastInfo.SpellSlot = 0;
		CastInfo.target = [];
		//CastInfo.SpellSlot = 46;// <- original packet
		//CastInfo.target = [{ unit: this.owner.netId, hitResult: 0 }];// <- original packet
		//.log(CastInfo);
	}

};
class YasuoQ3W extends _Spell {
	spellSlot = SpellSlot.Q;
	windup = 0.133;
	cooldown = 5;
	manaCost = 0;
	
	//constructor(spellChain, missile){
	//	super(spellChain, missile);
	//	
	//}
	shot(){
		
	}
	customCastInfo(CastInfo){
		CastInfo.target = [];
		CastInfo.DesignerCastTime = 0.33;
		CastInfo.DesignerTotalTime = 1.45;
	}

};

module.exports = class YasuoQ extends _Spellchain {
	castRange = 1150;

	async castSpellchain(packet){
		var owner = this.owner;
		this.spellStart();

		var anglePosition = _Spellchain.anglePosition(packet.Position, owner.position);

		this.spellsChained[0] = YasuoQ3W.cast(this, undefined, () => {
			this.castSpellAns(this.spellsChained[0].CastInfo, this.parent.PackageHash);
			
			this.spellsChained[1] = YasuoQ3.cast(this, undefined, () => {
				this.castSpellAns(this.spellsChained[1].CastInfo, this.parent.PackageHash);

				var skillshotTargetPosition = anglePosition.add(owner.position);
				var skillshot = Skillshot.create(owner, skillshotTargetPosition, {
					speed: 1200, range: 1150, radius: 90
				});

				var collidedWith = [];
				skillshot.callbacks.collision._ = {
					options: {
						range: skillshot.options.radius,
					},
					function: (target) => {
						if(skillshot.parent == target || collidedWith.includes(target.netId))
							return;
						
						collidedWith.push(target.netId);
						
						skillshot.parent.battle.attack(target);
						if(target.Movement.knockUp)
							target.Movement.knockUp({
								duration: 0.75,
								ParabolicGravity: 16.5,
								Facing: 1,
							});
					},
				};
		
				
				this.spellsChained[2] = YasuoQ3Mis.cast(this, skillshot, () => {
					this.spawnProjectileAns(this.spellsChained[2].CastInfo, this.parent.PackageHash);

					skillshot.firefire(skillshot.target);
					//console.log([this.spellsChained[0].CastInfo, this.spellsChained[1].CastInfo, this.spellsChained[2].CastInfo]);
				
					this.spellEnd();
				});

			});
		});

	}
};
