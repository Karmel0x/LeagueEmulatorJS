const _Ezreal = require("../_Ezreal");
const Skillshot = require("../../../../Attacks/Missiles/Skillshot");
const _Spellchain = require("../../_Spellchain");


module.exports = class EzrealR extends _Spellchain {
	async cast(packet){
		var owner = this.owner;

		if(owner.castingSpell)
			return;

		owner.castingSpell = true;
		owner.SET_COOLDOWN(packet.Slot, 4);
        owner.Movement.halt_start();

		owner.AddParticleTarget(this.parent.PackageHash, _Ezreal.hashes.particleHash['Ezreal_bow_huge.troy'], _Ezreal.hashes.boneHash['L_HAND']);
		var CastInfo = this.CastInfo_Position(packet);


		var skillshot = Skillshot.create(owner, CastInfo.TargetPosition, {
			speed: 2000, range: 25000, radius: 160
		});

		CastInfo.SpellHash = _Ezreal.hashes.spellHash.EzrealTrueshotBarrage;
		CastInfo.ManaCost = 0;
		CastInfo.SpellSlot = 45;
		CastInfo.SpellNetId = this.netId;
		CastInfo.MissileNetId = skillshot.netId;
		CastInfo.DesignerCastTime = 1;
		CastInfo.DesignerTotalTime = 1;
		this.castSpellAns(CastInfo);

		var windup = 1;//?
		await global.Utilities.wait(windup * 1000);
        skillshot.firefire(skillshot.target);

		await global.Utilities.wait(windup * 1000 / 2);

		owner.castingSpell = false;
        owner.Movement.halt_stop();
	}
};
