
module.exports = class _Spell {
	static TargetPosition(packet){
		return {
			x: packet.Position.x,
			y: packet.Position.y,
			z: 0,
		}
	}
	static TargetPositionEnd(packet){
		return {
			x: packet.EndPosition.x,
			y: packet.EndPosition.y,
			z: 0,
		}
	}

	/**
	 * 
	 * @param {_Spellchain} spellChain 
	 * @param {Missile} missile 
	 * @returns {_Spell}
	 */
	static cast(spellChain, missile = {
			netId: ++global.lastNetId,
		}, callback = () => {}){

		var spellInternal_1 = new this(spellChain, missile);
		setTimeout(() => {
			spellInternal_1.shot();
			callback();
		}, spellInternal_1.windup * 1000);
		return spellInternal_1;
	}


	netId;
	spellChain = null;
	_CastInfo = {};

	spellSlot = 255;
	cooldown = 0;
	manaCost = 0;

	windup = 0.05;//?

	/**
	 * 
	 * @param {_Spellchain} spellChain 
	 * @param {Missile} missile 
	 */
	constructor(spellChain, missile){
		var parent = spellChain;
		this.parent = parent;
		this.owner = parent.owner || parent.parent || parent;

		this.netId = ++global.lastNetId;
		this.spellChain = spellChain;
		this.missile = missile;
	}

	get CastInfo(){
		this.basicCastInfo(this._CastInfo);
		this.customCastInfo(this._CastInfo);
		return this._CastInfo;
	}
	
	basicCastInfo(CastInfo){
		//CastInfo = Object.assign({}, this.parent.CastInfo || {}, this.parent.lastSpellChained().CastInfo || {});
		CastInfo.TargetPosition = this.missile?.target?.Position || _Spell.TargetPosition(this.spellChain.collection.packet);
		CastInfo.TargetPositionEnd = this.missile?.target?.Position || _Spell.TargetPositionEnd(this.spellChain.collection.packet);

		CastInfo.SpellHash = this.parent.parent.hashes?.spellHash[this.constructor.name] || 0;
		CastInfo.SpellNetId = this.netId;
		CastInfo.SpellLevel = 0;
		CastInfo.AttackSpeedModifier = 1;
		CastInfo.CasterNetId = this.owner.netId;
		CastInfo.SpellChainOwnerNetId = this.owner.netId;
		CastInfo.PackageHash = this.parent.parent.PackageHash;
		CastInfo.MissileNetId = this.missile?.netId || 0;
		CastInfo.target = [{
			unit: this.missile?.target?.netId ?? this.owner.netId,//this.spellChain.spellChain.collidedWith[0].netId,
			hitResult: this.missile?.target?.netId ? 1 : 0,
		}];
		
		CastInfo.DesignerCastTime = -1;
		CastInfo.ExtraCastTime = 0;
		CastInfo.DesignerTotalTime = 0.70;
		CastInfo.Cooldown = this.cooldown;
		CastInfo.StartCastTime = 0;
		
		CastInfo.bitfield = {
			IsAutoAttack: false,
			IsSecondAutoAttack: false,
			IsForceCastingOrChannel: false,
			IsOverrideCastPosition: false,
			IsClickCasted: false,
		};

		CastInfo.SpellSlot = this.spellSlot;
		CastInfo.ManaCost = this.manaCost;
		CastInfo.SpellCastLaunchPosition = _Spell.TargetPosition(this.owner);
		CastInfo.AmmoUsed = 1;
		CastInfo.AmmoRechargeTime = 0;
	}

	/**
	 * @abstract
	 */
	customCastInfo(){

	}
	
	/**
	 * @abstract
	 */
	shot(){
		
	}
};
