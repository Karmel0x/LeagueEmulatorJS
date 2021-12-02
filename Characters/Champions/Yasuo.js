const { Vector2 } = require("three");
const Spell = require("../Spell");
const Skillshot = require("../../Classes/Attacks/Missiles/Skillshot");
const _Champion_ = require("../_Champion_");
const { target } = require("../../Packets/SharedStruct/CastInfo");

const spellHash = {
	YasuoQ: 0,
	YasuoQ2: 0,
	YasuoQ3: 0,
	YasuoQW: 0,
	YasuoQ2W: 0,
	YasuoQ3W: 0,
	YasuoQMis: 0,
	YasuoQ2Mis: 0,
	YasuoQ3Mis: 0,

	YasuoWMovingWall: 0,
	YasuoDashWrapper: 0,

	YasuoRKnockUpComboW: 0,
	YasuoRDummySpell: 0,
	TempYasuoRMissile: 0,
};
const particleHash = {
	'Yasuo_Base_Q3_Hand.troy': 0,
	'Yasuo_Base_Q3_cast_sound.troy': 0,
};
const boneHash = {
	//'root': 0,
	'L_HAND': 119924804,
};

{
	// just for development
	const { HashStringObject } = require("../../Functions/HashString");
	HashStringObject(spellHash);
	HashStringObject(particleHash);
	HashStringObject(boneHash);
}


class Q extends Spell {
	async cast(packet){
		var owner = this.parent.parent;

		if(owner.castingSpell)
			return;

		owner.castingSpell = true;
		//owner.SET_COOLDOWN(packet.Slot, 1);//todo: check if spell is on cooldown
        owner.halt_start();

		// Yasuo uses angle.. Q+Flash combo..
		var anglePosition = Spell.anglePosition(packet.Position, owner.position);

		var CastInfo = this.CastInfo_Position(packet);

		CastInfo.SpellHash = spellHash.YasuoQ3W;
		CastInfo.SpellSlot = 0;
		CastInfo.SpellNetID = this.netId;
		CastInfo.MissileNetID = 0;//skillshot.missile.netId;
		CastInfo.target = [];
		CastInfo.DesignerCastTime = 0.3;
		CastInfo.DesignerTotalTime = 1.45;
		//CastInfo.Cooldown = 5.7;//todo: `owner.SET_COOLDOWN` is not needed
		owner.castSpellAns(CastInfo);

		var windup = 0.133;//?
		await global.Utilities.wait(windup * 1000);

		CastInfo.SpellHash = spellHash.YasuoQ3;
		CastInfo.SpellSlot = 0;
		CastInfo.SpellNetID = this.netId;
		CastInfo.MissileNetID = 0;//skillshot.missile.netId;
		CastInfo.target = [];
		CastInfo.DesignerCastTime = 0.3;
		CastInfo.DesignerTotalTime = 1.45;
		//CastInfo.Cooldown = 5.7;//todo: `owner.SET_COOLDOWN` is not needed
		owner.castSpellAns(CastInfo);
		
		//owner.AddParticleTarget(particleHash['Yasuo_Base_Q3_Hand.troy']);
		//owner.AddParticleTarget(particleHash['Yasuo_Base_Q3_cast_sound.troy']);

		var windup = 0.133;//?
		await global.Utilities.wait(windup * 1000);

		CastInfo.TargetPosition = anglePosition.add(owner.position);
		var skillshot = Skillshot.create(owner, CastInfo.TargetPosition, {
			speed: 1200, range: 1150, radius: 90
		});
		CastInfo.TargetPosition = skillshot.target.Waypoints[0];
		CastInfo.TargetPositionEnd = skillshot.target.Waypoints[0];

		var collidedWith = [];
		skillshot.missile.callbacks.collision._ = {
			options: {
				range: 90,
			},
			function: (target) => {
				if(skillshot.missile.parent == target || collidedWith.includes(target.netId))
					return;
				
				collidedWith.push(target.netId);
				
				skillshot.missile.parent.battle.attack(target);
				if(target.knockUp)
					target.knockUp({
						duration: 0.75,
						ParabolicGravity: 16.5,
						Facing: 1,
					});
			},
		};

		CastInfo.SpellHash = spellHash.YasuoQ3Mis;
		CastInfo.SpellSlot = 0;
		CastInfo.SpellNetID = this.netId;
		CastInfo.MissileNetID = skillshot.missile.netId;
		CastInfo.target = [];
		CastInfo.DesignerCastTime = 0.3;
		CastInfo.DesignerTotalTime = 1.45;
		//CastInfo.Cooldown = 5.7;//todo: `owner.SET_COOLDOWN` is not needed
		owner.spawnProjectileAns(CastInfo);

        skillshot.missile.firefire(skillshot.target);

		await global.Utilities.wait(windup * 1000 * 2);

		owner.castingSpell = false;
        owner.halt_stop();
	}
};
class W extends Spell {
	async cast(packet){
		var owner = this.parent.parent;
		
		if(owner.castingSpell)
			return;

		owner.castingSpell = true;
		//owner.SET_COOLDOWN(packet.Slot, 2);
        owner.halt_start();


		
		owner.castingSpell = false;
        owner.halt_stop();
	}
};
class E extends Spell {
	castRange = 475;
	cast(packet){
		var owner = this.parent.parent;
		
		if(owner.castingSpell)
			return;

		owner.castingSpell = true;
		//owner.SET_COOLDOWN(packet.Slot, 3);

		var realPosition = Spell.getRealPosition(packet);
		var CastInfo = this.CastInfo_Position(packet);

		//CastInfo.SpellHash = spellHash.EzrealArcaneShift;
		//owner.castSpellAns(CastInfo);

		CastInfo.SpellHash = spellHash.YasuoDashWrapper;
		CastInfo.ManaCost = 0;
		CastInfo.SpellSlot = 2;//?
		CastInfo.SpellNetID = this.netId;
		CastInfo.MissileNetID = 1073743444;
		owner.spawnProjectileAns(CastInfo);

		owner.SET_ANIMATION([
			['RUN', 'Spell3']
		]);
		owner.callbacks.collision[this.netId] = {
			options: {
				range: owner.collisionRadius,
			},
			function: (target) => {
				if(target.netId != packet.TargetNetID)
					return;

				delete owner.callbacks.collision[this.netId];
				this.hit(target);
			}
		};

		owner.dashTo(realPosition, {
			speed: 750 + owner.stats.MoveSpeed.Total * 0.6,
			range: 475, minRange: 475,
			callback: () => {
				if(owner.callbacks.collision[this.netId])
					delete owner.callbacks.collision[this.netId];
				//else
				//	this.hit_TargetNetID(packet.TargetNetID);

				owner.SET_ANIMATION([
					['Spell3', 'RUN']
				]);
			}
		});
		
		owner.castingSpell = false;
	}
	//hit_TargetNetID(TargetNetID){
	//	if(!TargetNetID || !global.UnitsNetId[TargetNetID])
	//		return;
//
	//	var target = global.UnitsNetId[TargetNetID];
	//	this.hit(target);
	//}
	hit(target){
		//if(target.dead)
		//	return;
		var owner = this.parent.parent;

		owner.battle.attack(target);
	}
};
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
			//target: global.UnitsNetId[packet.TargetNetID] || false,
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
		
		this.CastInfo.SpellHash = spellHash.YasuoRKnockUpComboW;
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
		//this.spellChain.owner.teleport(realPosition, false);

		this.CastInfo.TargetPosition = this.spellChain.collection.Positions.angle.add(this.spellChain.owner.position);
		var skillshot = Skillshot.create(this.spellChain.owner, this.CastInfo.TargetPosition, {
			speed: 1200, range: 1150, radius: 90
		});
		this.CastInfo.TargetPosition = skillshot.target.Waypoints[0];
		this.CastInfo.TargetPositionEnd = skillshot.target.Waypoints[0];

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
				if(target.knockUp)
					target.knockUp({
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

		this.CastInfo.SpellHash = spellHash.YasuoRDummySpell;
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
		//this.spellChain.owner.teleport(realPosition, false);
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

		this.CastInfo.SpellHash = spellHash.TempYasuoRMissile;
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
class R extends Spell {
	castRange = 1200;

	owner = null;
	spellsChained = [];
	collection = {};

	makeCollection(packet){
		//this.collection.Target = global.UnitsNetId[packet.TargetNetID] || false;
		//if(!this.collection.Target)
		//	return false;
		
		this.collection.packet = packet;

		this.collection.Positions = {};
		this.collection.Positions.angle = Spell.anglePosition(packet.Position, this.owner.position);
		this.collection.Positions.real = Spell.getRealPosition(packet);
		return true;
	}
	async castSpellchain(packet){

		this.spellsChained[0] = await YasuoRKnockUpComboW.cast(this);
		this.owner.castSpellAns(this.spellsChained[0].CastInfo);

		this.spellsChained[1] = await YasuoRDummySpell.cast(this);
		this.owner.castSpellAns(this.spellsChained[1].CastInfo);

		this.spellsChained[2] = await TempYasuoRMissile.cast(this);
		this.owner.spawnProjectileAns(this.spellsChained[2].CastInfo);

		console.log([this.spellsChained[0].CastInfo, this.spellsChained[1].CastInfo, this.spellsChained[2].CastInfo]);

	}
	async cast(packet){
		this.owner = this.parent.parent;
		if(!this.makeCollection(packet))
			return;

		if(this.owner.castingSpell)
			return;

		this.owner.castingSpell = true;
        this.owner.halt_start();

		await this.castSpellchain(packet);

		this.owner.castingSpell = false;
        this.owner.halt_stop();
	}
};


module.exports = class Yasuo extends _Champion_ {
	PackageHash = 3275499062;
	attackWindupPercent = 22;
	constructor(parent){
		super(parent);

		this.spells = {
			0: new Q(this),
			1: new W(this),
			2: new E(this),
			3: new R(this),
			//62: new Passive(this),
			//64-81: Attack?
		};
	}
};
