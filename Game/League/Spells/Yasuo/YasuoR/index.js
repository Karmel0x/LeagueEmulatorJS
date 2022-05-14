const _Spellchain = require("../../_Spellchain");
const _Yasuo = require("../_Yasuo");
const Skillshot = require("../../../../Attacks/Missiles/Skillshot");
const _Spell = require("../../_Spell");


class YasuoRKnockUpComboW extends _Spell {

	static collect(packet){
		return {
			//target: global.unitsNetId[packet.TargetNetId] || false,
		};
	}

	constructor(spellChain, missile){
		super(spellChain, missile);
		
	}
	collidedWith = [];
	shot(){
		//this.spellChain.owner.Movement.teleport(realPosition, false);

		this.CastInfo.TargetPosition = this.spellChain.collection.Positions.angle.add(this.spellChain.owner.position);
		var skillshot = Skillshot.create(this.spellChain.owner, this.CastInfo.TargetPosition, {
			speed: 1200, range: 1150, radius: 90
		});
		this.CastInfo.TargetPosition = skillshot.target.Position;
		this.CastInfo.TargetPositionEnd = skillshot.target.Position;

		var collidedWith = [];
		skillshot.callbacks.collision._ = {
			options: {
				range: skillshot.options.radius,
			},
			function: (target) => {
				if(skillshot.parent == target || collidedWith.includes(target))
					return;
				
				collidedWith.push(target);
				
				skillshot.parent.battle.attack(target);
				if(target.Movement.knockUp)
					target.Movement.knockUp({
						duration: 0.75,
						ParabolicGravity: 16.5,
						Facing: 1,
					});
			},
		};
		this.collidedWith = collidedWith;
	}
	customCastInfo(CastInfo){
		CastInfo.target = [];
	}
}
class YasuoRDummySpell extends _Spell {

	constructor(spellChain, missile){
		super(spellChain, missile);
		
	}
	shot(){
		//this.spellChain.owner.Movement.teleport(realPosition, false);
	}
	customCastInfo(CastInfo){
		CastInfo.TargetPositionEnd = {
			x: 0,
			y: 0,
			z: 0,
		};
		CastInfo.SpellSlot = 45;
		CastInfo.target = [{
			unit: this.spellChain.owner.netId,
			hitResult: 1,
		}];
	}
}
class TempYasuoRMissile extends _Spell {


	constructor(spellChain, missile){
		super(spellChain, missile);

	}
	shot(){
		
	}
	customCastInfo(CastInfo){
		CastInfo.SpellSlot = 50;
		CastInfo.target = [{
			unit: 0,//this.spellChain.spellChain.collidedWith[0].netId,
			hitResult: 1,
		}];
		CastInfo.bitfield = {
			IsForceCastingOrChannel: true,
			IsOverrideCastPosition: true,
		};
	}
}

module.exports = class YasuoR extends _Spellchain {
	castRange = 1200;

	async castSpellchain(packet){

		this.spellsChained[0] = YasuoRKnockUpComboW.cast(this, undefined, () => {
			this.castSpellAns(this.spellsChained[0].CastInfo, this.parent.PackageHash);

			this.spellsChained[1] = YasuoRDummySpell.cast(this, undefined, () => {
				this.castSpellAns(this.spellsChained[1].CastInfo, this.parent.PackageHash);
	
				this.spellsChained[2] = TempYasuoRMissile.cast(this, undefined, () => {
					this.spawnProjectileAns(this.spellsChained[2].CastInfo, this.parent.PackageHash);
		
					console.log([this.spellsChained[0].CastInfo, this.spellsChained[1].CastInfo, this.spellsChained[2].CastInfo]);
				});
			});
		});

	}
};
