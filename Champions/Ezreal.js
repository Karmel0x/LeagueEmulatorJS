const { Vector2 } = require("three");
const Spell = require("./Spell");
const Skillshot = require("../Classes/Attacks/Missiles/Skillshot");
const Champion = require("./Champion");

const spellHash = {
	EzrealMysticShot: 25116740,
	EzrealMysticShotMissile: 100572389,
	
	EzrealEssenceFlux: 0,
	EzrealEssenceFluxMissile: 0,
	
	EzrealArcaneShift: 0,
	EzrealArcaneShiftMissile: 0,
	
	EzrealTrueshotBarrage: 0,
};
const particleHash = {
	'ezreal_bow.troy': 238891465,
	'ezreal_bow_yellow.troy': 0,
	'Ezreal_bow_huge.troy': 0,
};
const boneHash = {
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
		owner.SET_COOLDOWN(packet.Slot, 1);//todo: check if spell is on cooldown
        owner.halt_start();

		owner.AddParticleTarget(particleHash['ezreal_bow.troy'], boneHash['L_HAND']);
		var CastInfo = this.CastInfo_Position(packet);

		CastInfo.SpellHash = spellHash.EzrealMysticShot;
		owner.castSpellAns(CastInfo);

		var skillshot = Skillshot.create(owner, CastInfo.TargetPosition, {
			speed: 2000, range: 1150, radius: 60
		});

		var windup = 0.125;//?
		await global.Utilities.wait(windup * 1000);

		CastInfo.SpellHash = spellHash.EzrealMysticShotMissile;
		CastInfo.ManaCost = 0;
		CastInfo.SpellSlot = 45;
		CastInfo.SpellNetID = this.netId;
		CastInfo.MissileNetID = skillshot.missile.netId;
		owner.castSpellAns(CastInfo);

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

		owner.AddParticleTarget(particleHash['ezreal_bow_yellow.troy'], boneHash['L_HAND']);
		var CastInfo = this.CastInfo_Position(packet);

		CastInfo.SpellHash = spellHash.EzrealEssenceFlux;
		owner.castSpellAns(CastInfo);

		var skillshot = Skillshot.create(owner, CastInfo.TargetPosition, {
			speed: 1550, range: 1000, radius: 80
		});
		var collidedWith = [];
		skillshot.missile.callbacks.collision._ = {
			options: {
				range: 80,
			},
			function: (target) => {
				if(skillshot.missile.parent == target || collidedWith.includes(target.netId))
					return;
			
				collidedWith.push(target.netId);

				skillshot.missile.parent.battle.attack(target);
			},
		};

		var windup = 0.125;//?
		await global.Utilities.wait(windup * 1000);

		CastInfo.SpellHash = spellHash.EzrealEssenceFluxMissile;
		CastInfo.ManaCost = 0;
		CastInfo.SpellSlot = 46;//?
		CastInfo.SpellNetID = this.netId;
		CastInfo.MissileNetID = skillshot.missile.netId;
		owner.castSpellAns(CastInfo);

        skillshot.missile.firefire(skillshot.target);

		await global.Utilities.wait(windup * 1000 * 2);

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


		CastInfo.SpellHash = spellHash.EzrealArcaneShift;
		owner.castSpellAns(CastInfo);

		CastInfo.SpellHash = spellHash.EzrealArcaneShiftMissile;
		CastInfo.ManaCost = 0;
		CastInfo.SpellSlot = 47;//?
		CastInfo.SpellNetID = this.netId;
		CastInfo.MissileNetID = 1073743444;
		owner.castSpellAns(CastInfo);
		
		owner.dashTo(CastInfo.TargetPosition, {speed: 1800, range: 400});
		
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

		owner.AddParticleTarget(particleHash['Ezreal_bow_huge.troy'], boneHash['L_HAND']);
		var CastInfo = this.CastInfo_Position(packet);


		var skillshot = Skillshot.create(owner, CastInfo.TargetPosition, {
			speed: 2000, range: 25000, radius: 160
		});

		CastInfo.SpellHash = spellHash.EzrealTrueshotBarrage;
		CastInfo.ManaCost = 0;
		CastInfo.SpellSlot = 45;
		CastInfo.SpellNetID = this.netId;
		CastInfo.MissileNetID = skillshot.missile.netId;
		CastInfo.DesignerCastTime = 1;
		CastInfo.DesignerTotalTime = 1;
		owner.castSpellAns(CastInfo);

		var windup = 1;//?
		await global.Utilities.wait(windup * 1000);
        skillshot.missile.firefire(skillshot.target);

		await global.Utilities.wait(windup * 1000 / 2);

		owner.castingSpell = false;
        owner.halt_stop();
	}
};


module.exports = class Ezreal extends Champion {
	PackageHash = 2618078626;//[Character]Ezreal00
	attackWindupPercent = 18.839;
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
