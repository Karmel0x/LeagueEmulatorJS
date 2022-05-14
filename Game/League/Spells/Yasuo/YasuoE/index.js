const _Spellchain = require("../../_Spellchain");
const _Yasuo = require("../_Yasuo");


module.exports = class YasuoE extends _Spellchain {
	castRange = 475;
	cast(packet){
		var owner = this.owner;
		
		if(owner.castingSpell)
			return;

		owner.castingSpell = true;
		//owner.SET_COOLDOWN(packet.Slot, 3);

		var realPosition = _Spellchain.getRealPosition(packet);
		var CastInfo = this.CastInfo_Position(packet);

		CastInfo.SpellHash = _Yasuo.hashes.spellHash.YasuoDashWrapper;
		CastInfo.ManaCost = 0;
		CastInfo.SpellSlot = 2;//?
		CastInfo.SpellNetId = this.netId;
		CastInfo.MissileNetId = 1073743444;
		this.spawnProjectileAns(CastInfo, this.parent.PackageHash);

		owner.SET_ANIMATION([
			['RUN', 'Spell3']
		]);
		owner.callbacks.collision[this.netId] = {
			options: {
				range: owner.collisionRadius,
			},
			function: (target) => {
				if(target.netId != packet.TargetNetId)
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
				//	this.hit_TargetNetId(packet.TargetNetId);

				owner.SET_ANIMATION([
					['Spell3', 'RUN']
				]);
			}
		});
		
		owner.castingSpell = false;
	}
	//hit_TargetNetId(TargetNetId){
	//	if(!TargetNetId || !global.unitsNetId[TargetNetId])
	//		return;
//
	//	var target = global.unitsNetId[TargetNetId];
	//	this.hit(target);
	//}
	hit(target){
		//if(target.dead)
		//	return;
		var owner = this.owner;

		owner.battle.attack(target);
	}
};
