const _Spell = require("../../_Spell");
const _Yasuo = require("../_Yasuo");
const Skillshot = require("../../../../Attacks/Missiles/Skillshot");


class SpellInternalDefaults {
	static TargetPosition(packet){
		return {
            x: packet.Position.x,
            y: packet.Position.y,
            z: 0,
        }
	}
	static TargetPositionEnd(packet){
		return {
            x: packet.EndPosition.x,
            y: packet.EndPosition.y,
            z: 0,
        }
	}
}
class YasuoRKnockUpComboW {

	static collect(packet){
		return {
			//target: global.unitsNetId[packet.TargetNetID] || false,
		};
	}
	static async cast(spellChain){

		var missile = {
			netId: ++global.lastNetId,
		};

		var spellInternal_1 = new YasuoRKnockUpComboW(spellChain, missile);
		await global.Utilities.wait(spellInternal_1.windup * 1000);
		spellInternal_1.shot();
		return spellInternal_1;
	}

	netId;
	CastInfo = {};
	windup = 0.01;//?

	constructor(spellChain, missile){
		this.netId = ++global.lastNetId;
		this.spellChain = spellChain;
		
		this.CastInfo.TargetPosition = {
			x: this.spellChain.owner.position.x,
			y: this.spellChain.owner.position.y,
			z: 0,
		};
		this.CastInfo.TargetPositionEnd = {
			x: this.spellChain.owner.position.x,
			y: this.spellChain.owner.position.y,
			z: 0,
		};
		
		this.CastInfo.SpellHash = _Yasuo.hashes.spellHash[this.constructor.name];
		this.CastInfo.SpellSlot = 0;
		this.CastInfo.SpellNetID = this.netId;
		this.CastInfo.MissileNetID = missile.netId;
		this.CastInfo.target = [];
		this.CastInfo.DesignerCastTime = 0.25;
		this.CastInfo.DesignerTotalTime = 1.00;
		this.CastInfo.SpellLevel = 1;
		this.CastInfo.SpellChainOwnerNetID = this.spellChain.owner.netId;
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
		skillshot.missile.callbacks.collision._ = {
			options: {
				range: 90,
			},
			function: (target) => {
				if(skillshot.missile.parent == target || collidedWith.includes(target))
					return;
				
				collidedWith.push(target);
				
				skillshot.missile.parent.battle.attack(target);
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
}
class YasuoRDummySpell {

	static async cast(spellChain){
		var missile = {
			netId: ++global.lastNetId,
		};

		var spellInternal_1 = new YasuoRDummySpell(spellChain, missile);
		await global.Utilities.wait(spellInternal_1.windup * 1000);
		spellInternal_1.shot();
		return spellInternal_1;
	}

	netId;
	CastInfo = {};
	windup = 0.01;//?

	spellChain = null;

	constructor(spellChain, missile){
		this.netId = ++global.lastNetId;
		this.spellChain = spellChain;
		
		this.CastInfo = Object.assign({}, this.spellChain.spellsChained[0].CastInfo);

		this.CastInfo.TargetPosition = SpellInternalDefaults.TargetPosition(this.spellChain.collection.packet);
		this.CastInfo.TargetPositionEnd = {
			x: 0,
			y: 0,
			z: 0,
		};

		this.CastInfo.SpellHash = _Yasuo.hashes.spellHash[this.constructor.name];
		this.CastInfo.SpellNetID = this.netId;
		this.CastInfo.MissileNetID = missile.netId;
		this.CastInfo.SpellSlot = 45;
		this.CastInfo.SpellLevel = 0;
		this.CastInfo.target = [{
			unit: this.spellChain.owner.netId,
			hitResult: 1,
		}];
	}
	shot(){
		//this.spellChain.owner.Movement.teleport(realPosition, false);
	}
}
class TempYasuoRMissile {

	static async cast(spellChain){
		var missile = {
			netId: ++global.lastNetId,
		};

		var spellInternal_1 = new TempYasuoRMissile(spellChain, missile);
		await global.Utilities.wait(spellInternal_1.windup * 1000);
		spellInternal_1.shot();
		return spellInternal_1;
	}

	netId;
	CastInfo = {};
	windup = 0.05;//?

	spellChain = null;

	constructor(spellChain, missile){
		this.netId = ++global.lastNetId;
		this.spellChain = spellChain;
		
		this.CastInfo = Object.assign({}, this.spellChain.spellsChained[1].CastInfo);

		this.CastInfo.TargetPositionEnd = SpellInternalDefaults.TargetPositionEnd(this.spellChain.collection.packet);

		this.CastInfo.SpellHash = _Yasuo.hashes.spellHash[this.constructor.name];
		this.CastInfo.SpellNetID = this.netId;
		this.CastInfo.MissileNetID = missile.netId;
		this.CastInfo.DesignerCastTime = -1;
		this.CastInfo.DesignerTotalTime = 0.70;
		this.CastInfo.SpellSlot = 50;
		this.CastInfo.target = [{
			unit: 0,//this.spellChain.spellChain.collidedWith[0].netId,
			hitResult: 1,
		}];
		this.CastInfo.bitfield = {
			IsForceCastingOrChannel: true,
			IsOverrideCastPosition: true,
		};
	}
	shot(){
		
	}
}

module.exports = class YasuoR extends _Yasuo {
	castRange = 1200;

	spellsChained = [];
	collection = {};

	makeCollection(packet){
		//this.collection.Target = global.unitsNetId[packet.TargetNetID] || false;
		//if(!this.collection.Target)
		//	return false;
		
		this.collection.packet = packet;

		this.collection.Positions = {};
		this.collection.Positions.angle = _Spell.anglePosition(packet.Position, this.owner.position);
		this.collection.Positions.real = _Spell.getRealPosition(packet);
		return true;
	}
	async castSpellchain(packet){

		this.spellsChained[0] = await YasuoRKnockUpComboW.cast(this);
		this.owner.castSpellAns(this.spellsChained[0].CastInfo, this.PackageHash);

		this.spellsChained[1] = await YasuoRDummySpell.cast(this);
		this.owner.castSpellAns(this.spellsChained[1].CastInfo, this.PackageHash);

		this.spellsChained[2] = await TempYasuoRMissile.cast(this);
		this.owner.spawnProjectileAns(this.spellsChained[2].CastInfo, this.PackageHash);

		console.log([this.spellsChained[0].CastInfo, this.spellsChained[1].CastInfo, this.spellsChained[2].CastInfo]);

	}
	async cast(packet){
		if(!this.makeCollection(packet))
			return;

		if(this.owner.castingSpell)
			return;

		this.owner.castingSpell = true;
        this.owner.Movement.halt_start();

		await this.castSpellchain(packet);

		this.owner.castingSpell = false;
        this.owner.Movement.halt_stop();
	}
};
