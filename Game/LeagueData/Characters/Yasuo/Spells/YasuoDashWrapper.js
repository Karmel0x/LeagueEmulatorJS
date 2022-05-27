
const { HashString } = require("../../../../../Functions/HashString");
const PositionHelper = require("../../../../../Functions/PositionHelper");
const _Spell = require("../../../../DataMethods/Spells/_Spell");



module.exports = class YasuoDashWrapper extends _Spell {
	castRange = 475;
	movingSpell = true;

	/**
	 * @todo probably need to create missile cause MissileNetId differs from spellNetId
	 */
	onCast(spellData){
		//spellData.maxRangePosition = PositionHelper.getMaxRangePosition(this.owner, spellData.packet, this.castRange);

		this.CastInfo.MissileNetId = 1073743444;

		this.owner.SET_ANIMATION([
			['RUN', 'Spell3']
		]);
		this.owner.callbacks.collision[spellData.spellCast.netId] = {
			options: {
				range: this.owner.collisionRadius,
			},
			function: (target) => {
				if(target.netId != spellData.packet.TargetNetId)
					return;

				delete this.owner.callbacks.collision[spellData.spellCast.netId];
				this.hit(target);
			}
		};

		this.owner.dashTo(spellData.packet.position, {
			speed: 750 + this.owner.moveSpeed.total * 0.6,
			range: 475, minRange: 475,
			callback: () => {
				if(this.owner.callbacks.collision[spellData.spellCast.netId])
					delete owner.callbacks.collision[spellData.spellCast.netId];
				//else
				//	this.hit_TargetNetId(packet.TargetNetId);

				this.owner.SET_ANIMATION([
					['Spell3', 'RUN']
				]);
			}
		});
		
	}
	
	hit(target){
		this.owner.attack(target);
	}
};
