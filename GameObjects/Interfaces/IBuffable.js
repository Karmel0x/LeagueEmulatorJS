
const { createPacket } = require("../../Core/PacketUtilities");


/**
 * Interface for units that can be buffed.
 * @param {GameObject} I 
 */
 module.exports = (I) => class IBuffable extends I {

	/**
	 * Sending packet to client to add buff
	 * @private
	 * @param {_Spell} spellObject 
	 */
	addBuffAns(spellObject){
        var ADD_BUFF = createPacket('ADD_BUFF', 'S2C');
        ADD_BUFF.netId = this.netId;
        ADD_BUFF.BuffSlot = spellObject.BuffSlot;
        ADD_BUFF.BuffType = spellObject.buff.BuffType;
        ADD_BUFF.Count = 1;
        ADD_BUFF.IsHidden = 0;
        ADD_BUFF.BuffNameHash = spellObject.spellHash;
        ADD_BUFF.PackageHash = spellObject.PackageHash;
        ADD_BUFF.RunningTime = 0;
        ADD_BUFF.Duration = spellObject.buff.Duration;
        ADD_BUFF.CasterNetId = this.netId;
		this.sendTo_vision(ADD_BUFF);
	}
	/**
	 * Sending packet to client to remove buff
	 * @private
	 * @param {_Spell} spellObject 
	 */
	removeBuffAns(spellObject){
        var REMOVE_BUFF = createPacket('REMOVE_BUFF', 'S2C');
        REMOVE_BUFF.netId = this.netId;
        REMOVE_BUFF.BuffSlot = spellObject.BuffSlot;
        REMOVE_BUFF.BuffNameHash = spellObject.spellHash;
        REMOVE_BUFF.RunTimeRemove = 0;
		this.sendTo_vision(REMOVE_BUFF);
	}
	buffs = {};
	BuffSlots = 0;
	//addBuff(buffName = 'SummonerHeal'){
	//	//this.buffs[buffName] = new BuffList[buffName](this);
	//}

	/**
	 * Function holding waiting loop to check for buff end
	 * @private
	 * @param {_Spell} buff
	 */
	async buffEnd(buff){
		if(!buff.EndTime)
			return;

		while(performance.now() < buff.EndTime)
			await global.Utilities.wait(50);

		this.removeBuffC(buff);
	}
	/**
	 * Adding spell to buff list
	 * @param {_Spell} spellObject
	 */
	addBuffC(spellObject){
		if(!this.buffs[spellObject.constructor.name]){
			this.buffs[spellObject.constructor.name] = spellObject;
			spellObject.BuffSlot = this.BuffSlots++;
			spellObject.buffActivate();
			this.buffs[spellObject.constructor.name].EndTime = performance.now() + spellObject.buff.Duration * 1000;
			this.buffEnd(spellObject);
		}else{//todo
			this.buffs[spellObject.constructor.name].EndTime = performance.now() + spellObject.buff.Duration * 1000;
		}

		this.addBuffAns(this.buffs[spellObject.constructor.name]);
	}
	//removeBuff(buffName = 'SummonerHeal'){
	//	this.removeBuffAns(this.buffs[buffName]);
	//	delete this.buffs[buffName];
	//}
	/**
	 * Remove buff by spellObject, usually called automatically when spell ends
	 * @param {_Spell} spellObject
	 */
	removeBuffC(spellObject){
		spellObject.buffDeactivate();

		//this.BuffSlots--;
		this.removeBuffAns(spellObject);
		delete this.buffs[spellObject.constructor.name];
	}
	/**
	 * Check if buff is active in buff list
	 * @param {_Spell} spellObject
	 * @returns {Boolean}
	 */
	hasBuff(spell){
		if(typeof spell != 'string')
			spell = spell.constructor.name;

		return !!this.buffs[spell];
	}
	
};
