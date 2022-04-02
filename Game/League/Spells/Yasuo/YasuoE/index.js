const _Spell = require("../../_Spell");
const _Yasuo = require("../_Yasuo");


module.exports = class YasuoE extends _Yasuo {
	castRange = 475;
	cast(packet){
		var owner = this.owner;
		
		if(owner.castingSpell)
			return;

		owner.castingSpell = true;
		//owner.SET_COOLDOWN(packet.Slot, 3);

		var realPosition = _Spell.getRealPosition(packet);
		var CastInfo = this.CastInfo_Position(packet);

		CastInfo.SpellHash = _Yasuo.hashes.spellHash.YasuoDashWrapper;
		CastInfo.ManaCost = 0;
		CastInfo.SpellSlot = 2;//?
		CastInfo.SpellNetID = this.netId;
		CastInfo.MissileNetID = 1073743444;
		owner.spawnProjectileAns(CastInfo, this.PackageHash);

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

		owner.Movement.dashTo(realPosition, {
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
	//	if(!TargetNetID || !global.unitsNetId[TargetNetID])
	//		return;
//
	//	var target = global.unitsNetId[TargetNetID];
	//	this.hit(target);
	//}
	hit(target){
		//if(target.dead)
		//	return;
		var owner = this.owner;

		owner.battle.attack(target);
	}
};
