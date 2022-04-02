const _Spell = require("../../_Spell");
const _Yasuo = require("../_Yasuo");
const Skillshot = require("../../../../Attacks/Missiles/Skillshot");


module.exports = class YasuoQ extends _Yasuo {
	async cast(packet){
		var owner = this.owner;

		if(owner.castingSpell)
			return;

		owner.castingSpell = true;
		//owner.SET_COOLDOWN(packet.Slot, 1);//todo: check if spell is on cooldown

		// Yasuo uses angle.. Q+Flash combo..
		var anglePosition = _Spell.anglePosition(packet.Position, owner.position);

		var CastInfo = this.CastInfo_Position(packet);

		CastInfo.SpellHash = _Yasuo.hashes.spellHash.YasuoQ3W;
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

		CastInfo.SpellHash = _Yasuo.hashes.spellHash.YasuoQ3;
		CastInfo.SpellSlot = 0;
		CastInfo.SpellNetID = this.netId;
		CastInfo.MissileNetID = 0;//skillshot.missile.netId;
		CastInfo.target = [];
		CastInfo.DesignerCastTime = 0.3;
		CastInfo.DesignerTotalTime = 1.45;
		//CastInfo.Cooldown = 5.7;//todo: `owner.SET_COOLDOWN` is not needed
        owner.Movement.halt_start();
		owner.castSpellAns(CastInfo);
		
		//owner.AddParticleTarget(this.PackageHash, _Ezreal.hashes.particleHash['Yasuo_Base_Q3_Hand.troy']);
		//owner.AddParticleTarget(this.PackageHash, _Ezreal.hashes.particleHash['Yasuo_Base_Q3_cast_sound.troy']);

		var windup = 0.133;//?
		await global.Utilities.wait(windup * 1000);

		CastInfo.TargetPosition = anglePosition.add(owner.position);
		var skillshot = Skillshot.create(owner, CastInfo.TargetPosition, {
			speed: 1200, range: 1150, radius: 90
		});
		CastInfo.TargetPosition = skillshot.target.Position;
		CastInfo.TargetPositionEnd = skillshot.target.Position;

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
				if(target.Movement.knockUp)
					target.Movement.knockUp({
						duration: 0.75,
						ParabolicGravity: 16.5,
						Facing: 1,
					});
			},
		};

		CastInfo.SpellHash = _Yasuo.hashes.spellHash.YasuoQ3Mis;
		CastInfo.SpellSlot = 0;
		CastInfo.SpellNetID = this.netId;
		CastInfo.MissileNetID = skillshot.missile.netId;
		CastInfo.target = [];
		CastInfo.DesignerCastTime = 0.3;
		CastInfo.DesignerTotalTime = 1.45;
		//CastInfo.Cooldown = 5.7;//todo: `owner.SET_COOLDOWN` is not needed
		owner.spawnProjectileAns(CastInfo, this.PackageHash);

        skillshot.missile.firefire(skillshot.target);

		await global.Utilities.wait(windup * 1000 * 2);

		owner.castingSpell = false;
        owner.Movement.halt_stop();
	}
};
