
/**
 * Creates Spell Cast Info for _Spell.
 * After it has been created, spell shouldn't be cancelled
 */
module.exports = class SpellCast {


	get spell(){
		return this.spellData.spell;
	}
	get owner(){
		return this.spellData.spell.owner;
	}
	get missile(){
		return this.spellData.missile;
	}

	_CastInfo = {};
	get CastInfo(){
		var CastInfo = {};
		CastInfo.targetPosition = this.missile?.target?.position || this.spellData.position || this.owner?.position;
		CastInfo.targetPositionEnd = this.missile?.target?.position || this.spellData.position || this.owner?.position;

		CastInfo.spellHash = this.spell.spellHash;
		CastInfo.spellCastNetId = this.netId;
		CastInfo.spellLevel = this.spell.spellLevel || 0;
		CastInfo.AttackSpeedModifier = 1;
		CastInfo.CasterNetId = this.owner?.netId || 0;
		CastInfo.SpellChainOwnerNetId = this.owner.netId || 0;
		CastInfo.PackageHash = this.spell.PackageHash;
		CastInfo.MissileNetId = this.missile?.netId || 0;
		CastInfo.target = [{
			unit: this.missile?.target?.netId ?? this.target?.netId ?? this.owner.netId,
			hitResult: this.missile?.target?.netId ? 1 : 0,//todo
		}];
		
		CastInfo.DesignerCastTime = -1;
		CastInfo.ExtraCastTime = 0;
		CastInfo.DesignerTotalTime = 0.70;
		CastInfo.Cooldown = this.spell.cooldown || 0;
		CastInfo.StartCastTime = 0;
		
		CastInfo.bitfield = {
			IsAutoAttack: false,
			IsSecondAutoAttack: false,
			IsForceCastingOrChannel: false,
			IsOverrideCastPosition: false,
			IsClickCasted: false,
		};

		CastInfo.SpellSlot = this.spell.spellSlot;
		CastInfo.manaCost = this.spell.manaCost;
		CastInfo.SpellCastLaunchPosition = this.owner?.position;
		CastInfo.AmmoUsed = 1;
		CastInfo.AmmoRechargeTime = 0;

		Object.assign(CastInfo, this.spell.CastInfo, this._CastInfo);
		return CastInfo;
	}

	/**
	 * 
	 * @param {Object} args0
	 * @param {SpellCast} args0.spellCast
	 * @param {_Spell} args0.spell
	 * @param {Missile} args0.missile
	 * @param {Unit|GameObject|Dummytarget} [args0.target=args0.missile.target] (must have a position, may have netId)
	 */
	constructor(options){

		this.netId = ++global.lastNetId;
		this.spellData = options.spellData;

	}
};
