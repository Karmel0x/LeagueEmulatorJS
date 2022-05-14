const _Ezreal = require("../_Ezreal");
const Skillshot = require("../../../../Attacks/Missiles/Skillshot");
const _Spellchain = require("../../_Spellchain");


module.exports = class EzrealQ extends _Spellchain {
	async cast(packet){
		var owner = this.owner;

		if(owner.castingSpell)
			return;

		owner.castingSpell = true;
		owner.SET_COOLDOWN(packet.Slot, 1);//todo: check if spell is on cooldown
        owner.Movement.halt_start();

		owner.AddParticleTarget(this.parent.PackageHash, _Ezreal.hashes.particleHash['ezreal_bow.troy'], _Ezreal.hashes.boneHash['L_HAND']);
		var CastInfo = this.CastInfo_Position(packet);

		CastInfo.SpellHash = _Ezreal.hashes.spellHash.EzrealMysticShot;
		this.castSpellAns(CastInfo);

		var skillshot = Skillshot.create(owner, CastInfo.TargetPosition, {
			speed: 2000, range: 1150, radius: 60
		});

		var windup = 0.125;//?
		await global.Utilities.wait(windup * 1000);

		CastInfo.SpellHash = _Ezreal.hashes.spellHash.EzrealMysticShotMissile;
		CastInfo.ManaCost = 0;
		CastInfo.SpellSlot = 45;
		CastInfo.SpellNetId = this.netId;
		CastInfo.MissileNetId = skillshot.netId;
		this.castSpellAns(CastInfo);

        skillshot.firefire(skillshot.target);

		await global.Utilities.wait(windup * 1000 * 2);

		owner.castingSpell = false;
        owner.Movement.halt_stop();
	}
};
