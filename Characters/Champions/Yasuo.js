const { Vector2 } = require("three");
const Spell = require("../Spell");
const Skillshot = require("../../Classes/Attacks/Missiles/Skillshot");
const _Champion_ = require("../_Champion_");

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

		var realPosition = this.getRealPosition(packet);
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
class R extends Spell {
	async cast(packet){
		var owner = this.parent.parent;

		if(owner.castingSpell)
			return;

		owner.castingSpell = true;
		//owner.SET_COOLDOWN(packet.Slot, 4);
        owner.halt_start();



		owner.castingSpell = false;
        owner.halt_stop();
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
