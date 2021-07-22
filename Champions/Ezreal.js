const { Vector2 } = require("three");
const Spell = require("./Spell");
const Skillshot = require("../Classes/Attacks/Skillshot");
const SummonerSpell = require("./SummonerSpell");

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
        this.parent.parent.halt_start();
		this.parent.parent.AddParticleTarget(particleHash['ezreal_bow.troy'], boneHash['L_HAND']);

		var CastInfo = this.CastInfo_Position(packet);

		CastInfo.SpellHash = spellHash.EzrealMysticShot;
		this.parent.parent.castSpellAns(CastInfo);

        var missile = new Skillshot(this.parent.parent, {speed: 2000});

		var windup = 0.125;//?
		await global.Utilities.wait(windup * 1000);

		CastInfo.SpellHash = spellHash.EzrealMysticShotMissile;
		CastInfo.ManaCost = 0;
		CastInfo.SpellSlot = 45;
		CastInfo.SpellNetID = this.netId;
		CastInfo.MissileNetID = missile.netId;
		this.parent.parent.castSpellAns(CastInfo);

		var target = {
			transform: {
				position: new Vector2(CastInfo.TargetPosition.x, CastInfo.TargetPosition.y)
			}
		};
        missile.firefire(target);

		this.parent.parent.SET_COOLDOWN(packet.Slot);
		
		await global.Utilities.wait(2 * windup * 1000);
        this.parent.parent.halt_stop(true);
	}
};
class W extends Spell {
	cast(packet){
        this.parent.parent.halt0();//todo: halt only during spell cast?
		this.parent.parent.AddParticleTarget(particleHash['ezreal_bow_yellow.troy'], boneHash['L_HAND']);

		var CastInfo = this.CastInfo_Position(packet);

		CastInfo.SpellHash = spellHash.EzrealEssenceFlux;
		this.parent.parent.castSpellAns(CastInfo);

		CastInfo.SpellHash = spellHash.EzrealEssenceFluxMissile;
		CastInfo.ManaCost = 0;
		CastInfo.SpellSlot = 46;//?
		CastInfo.SpellNetID = this.netId;
		CastInfo.MissileNetID = 1073743444;
		this.parent.parent.castSpellAns(CastInfo);

		this.parent.parent.SET_COOLDOWN(packet.Slot);
	}
};
class E extends Spell {
	cast(packet){
        this.parent.parent.halt0();

		var CastInfo = this.CastInfo_Position(packet);
		
		/*
		//todo:
		var spellRange = 500;
		if(player.transform.position.distanceTo(CastInfo.TargetPosition) > spellRange)
			CastInfo.TargetPosition.normalize().multiplyScalar(spellRange);
		
		if(Map.isUnwalkable(CastInfo.TargetPosition))
			CastInfo.TargetPosition = Map.getNearestWalkable(CastInfo.TargetPosition);
		*/


		CastInfo.SpellHash = spellHash.EzrealArcaneShift;
		this.parent.parent.castSpellAns(CastInfo);

		CastInfo.SpellHash = spellHash.EzrealArcaneShiftMissile;
		CastInfo.ManaCost = 0;
		CastInfo.SpellSlot = 47;//?
		CastInfo.SpellNetID = this.netId;
		CastInfo.MissileNetID = 1073743444;
		this.parent.parent.castSpellAns(CastInfo);

		this.parent.parent.SET_COOLDOWN(packet.Slot);
	}
};
class R extends Spell {
	cast(packet){
        this.parent.parent.halt0();
		this.parent.parent.AddParticleTarget(particleHash['Ezreal_bow_huge.troy'], boneHash['L_HAND']);

		var CastInfo = this.CastInfo_Position(packet);

		CastInfo.SpellNetID = this.netId;
		CastInfo.MissileNetID = 1073743444;
		CastInfo.SpellHash = spellHash.EzrealTrueshotBarrage;
		this.parent.parent.castSpellAns(CastInfo);

		this.parent.parent.SET_COOLDOWN(packet.Slot);
	}
};


module.exports = class Ezreal {
	PackageHash = 2618078626;
	constructor(parent){
		this.parent = parent;
		this.spells = {
			0: new Q(this),
			1: new W(this),
			2: new E(this),
			3: new R(this),
			4: new SummonerSpell(this, 'SummonerHeal'),
			5: new SummonerSpell(this, 'SummonerFlash'),
			//62: new Passive(this),
			//64-81: Attack?
		};
	}
};
