const _Ezreal = require("../_Ezreal");
const Skillshot = require("../../../../Attacks/Missiles/Skillshot");
const _Spellchain = require("../../_Spellchain");


module.exports = class EzrealW extends _Spellchain {
	async cast(packet){
		var owner = this.owner;
		
		if(owner.castingSpell)
			return;

		owner.castingSpell = true;
		owner.SET_COOLDOWN(packet.Slot, 2);
        owner.Movement.halt_start();

		owner.AddParticleTarget(this.parent.PackageHash, _Ezreal.hashes.particleHash['ezreal_bow_yellow.troy'], _Ezreal.hashes.boneHash['L_HAND']);
		var CastInfo = this.CastInfo_Position(packet);

		CastInfo.SpellHash = _Ezreal.hashes.spellHash.EzrealEssenceFlux;
		this.castSpellAns(CastInfo);

		var skillshot = Skillshot.create(owner, CastInfo.TargetPosition, {
			speed: 1550, range: 1000, radius: 80
		});
		var collidedWith = [];
		skillshot.callbacks.collision._ = {
			options: {
				range: 80,
			},
			function: (target) => {
				if(skillshot.parent == target || collidedWith.includes(target.netId))
					return;
			
				collidedWith.push(target.netId);

				skillshot.parent.battle.attack(target);
			},
		};

		var windup = 0.125;//?
		await global.Utilities.wait(windup * 1000);

		CastInfo.SpellHash = _Ezreal.hashes.spellHash.EzrealEssenceFluxMissile;
		CastInfo.ManaCost = 0;
		CastInfo.SpellSlot = 46;//?
		CastInfo.SpellNetId = this.netId;
		CastInfo.MissileNetId = skillshot.netId;
		this.castSpellAns(CastInfo);

        skillshot.firefire(skillshot.target);

		await global.Utilities.wait(windup * 1000 * 2);

		owner.castingSpell = false;
        owner.Movement.halt_stop();
	}
};
