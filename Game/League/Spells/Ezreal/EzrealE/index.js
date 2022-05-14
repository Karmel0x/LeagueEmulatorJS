const _Spellchain = require("../../_Spellchain");
const _Ezreal = require("../_Ezreal");


module.exports = class EzrealE extends _Spellchain {
	cast(packet){
		var owner = this.owner;
		
		if(owner.castingSpell)
			return;

		owner.castingSpell = true;
		owner.SET_COOLDOWN(packet.Slot, 3);

		var CastInfo = this.CastInfo_Position(packet);
		
		/*
		//todo:
		var spellRange = 500;
		if(player.Position.distanceTo(CastInfo.TargetPosition) > spellRange)
			CastInfo.TargetPosition.normalize().multiplyScalar(spellRange);
		
		if(Map.isUnwalkable(CastInfo.TargetPosition))
			CastInfo.TargetPosition = Map.getNearestWalkable(CastInfo.TargetPosition);
		*/


		CastInfo.SpellHash = _Ezreal.hashes.spellHash.EzrealArcaneShift;
		owner.castSpellAns(CastInfo);

		CastInfo.SpellHash = _Ezreal.hashes.spellHash.EzrealArcaneShiftMissile;
		CastInfo.ManaCost = 0;
		CastInfo.SpellSlot = 47;//?
		CastInfo.SpellNetId = this.netId;
		CastInfo.MissileNetId = 1073743444;
		this.castSpellAns(CastInfo);
		
		owner.Movement.dashTo(CastInfo.TargetPosition, {speed: 1800, range: 400});
		
		owner.castingSpell = false;
	}
};
