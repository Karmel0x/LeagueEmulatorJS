const { Vector2 } = require("three");
const Spell = require("./Spell");
const Skillshot = require("../Classes/Attacks/Missiles/Skillshot");
const Champion = require("./Champion");

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
	const { HashStringObject } = require("../Functions/HashString");
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

		var CastInfo = this.CastInfo_Position(packet);

		var skillshot = Skillshot.create(owner, CastInfo.TargetPosition, {
			speed: 1200, range: 1150, radius: 90
		});
		CastInfo.TargetPosition = skillshot.target.Waypoints[0];
		CastInfo.TargetPositionEnd = skillshot.target.Waypoints[0];

		var collidedWith = [];
		skillshot.missile.collisionCallback = (target) => {
			if(skillshot.missile.parent == target || collidedWith.includes(target.netId))
				return;
	
			collidedWith.push(target.netId);
			
			skillshot.missile.parent.battle.attack(target);
			target.knockUp();
		}


		CastInfo.SpellHash = spellHash.YasuoQ3W;
		CastInfo.ManaCost = 0;
		CastInfo.SpellSlot = 0;
		CastInfo.SpellNetID = this.netId;
		CastInfo.MissileNetID = skillshot.missile.netId;
		CastInfo.target = [];
		CastInfo.DesignerCastTime = 0.3;
		CastInfo.DesignerTotalTime = 1.45;
		//CastInfo.Cooldown = 5.7;//todo: `owner.SET_COOLDOWN` is not needed
		owner.castSpellAns(CastInfo);

		CastInfo.SpellHash = spellHash.YasuoQ3;
		CastInfo.ManaCost = 0;
		CastInfo.SpellSlot = 0;
		CastInfo.SpellNetID = this.netId;
		CastInfo.MissileNetID = skillshot.missile.netId;
		CastInfo.target = [];
		CastInfo.DesignerCastTime = 0.3;
		CastInfo.DesignerTotalTime = 1.45;
		//CastInfo.Cooldown = 5.7;//todo: `owner.SET_COOLDOWN` is not needed
		owner.castSpellAns(CastInfo);
		
		//owner.AddParticleTarget(particleHash['Yasuo_Base_Q3_Hand.troy']);
		//owner.AddParticleTarget(particleHash['Yasuo_Base_Q3_cast_sound.troy']);

		var windup = 0.133;//?
		await global.Utilities.wait(windup * 1000);

		CastInfo.SpellHash = spellHash.YasuoQ3Mis;
		CastInfo.ManaCost = 0;
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
		owner.SET_COOLDOWN(packet.Slot, 2);
        owner.halt_start();


		
		owner.castingSpell = false;
        owner.halt_stop();
	}
};
class E extends Spell {
	cast(packet){
		var owner = this.parent.parent;
		
		if(owner.castingSpell)
			return;

		owner.castingSpell = true;
		owner.SET_COOLDOWN(packet.Slot, 3);

		var CastInfo = this.CastInfo_Position(packet);
		
		/*
		//todo:
		var spellRange = 500;
		if(player.Waypoints[0].distanceTo(CastInfo.TargetPosition) > spellRange)
			CastInfo.TargetPosition.normalize().multiplyScalar(spellRange);
		
		if(Map.isUnwalkable(CastInfo.TargetPosition))
			CastInfo.TargetPosition = Map.getNearestWalkable(CastInfo.TargetPosition);
		*/


		//CastInfo.SpellHash = spellHash.EzrealArcaneShift;
		//owner.castSpellAns(CastInfo);

		CastInfo.SpellHash = spellHash.YasuoDashWrapper;
		CastInfo.ManaCost = 0;
		CastInfo.SpellSlot = 47;//?
		CastInfo.SpellNetID = this.netId;
		CastInfo.MissileNetID = 1073743444;
		owner.spawnProjectileAns(CastInfo);

        var pos = new Vector2(CastInfo.TargetPosition.x, CastInfo.TargetPosition.y);
		owner.dash(pos, {speed: 1800});//testing
		
		owner.castingSpell = false;
	}
};
class R extends Spell {
	async cast(packet){
		var owner = this.parent.parent;

		if(owner.castingSpell)
			return;

		owner.castingSpell = true;
		owner.SET_COOLDOWN(packet.Slot, 4);
        owner.halt_start();



		owner.castingSpell = false;
        owner.halt_stop();
	}
};


module.exports = class Yasuo extends Champion {
	PackageHash = 3275499062;
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
	get name(){
		return this.constructor.name;
	}
};
