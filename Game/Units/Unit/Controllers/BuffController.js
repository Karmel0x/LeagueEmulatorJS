//var BuffList = {
//	SummonerDot: require('./Buffs/SummonerDot'),
//	SummonerHeal: require('./Buffs/SummonerHeal'),
//};

const { createPacket } = require("../../../../Core/PacketUtilities");

module.exports = class BuffController {
	constructor(parent){
		this.parent = parent;
		this.owner = parent.owner || parent.parent || parent;

	}
	/**
	 * Sending packet to client to add buff
	 * @private
	 * @param {_Spellchain} spellObject 
	 */
	addBuffAns(spellObject){console.log(spellObject);
        var ADD_BUFF = createPacket('ADD_BUFF', 'S2C');
        ADD_BUFF.netId = this.parent.netId;
        ADD_BUFF.BuffSlot = spellObject.BuffSlot;
        ADD_BUFF.BuffType = spellObject.buff.BuffType;
        ADD_BUFF.Count = 1;
        ADD_BUFF.IsHidden = 0;
        ADD_BUFF.BuffNameHash = spellObject.spellHash;
        ADD_BUFF.PackageHash = spellObject.PackageHash;
        ADD_BUFF.RunningTime = 0;
        ADD_BUFF.Duration = spellObject.buff.Duration;
        ADD_BUFF.CasterNetId = this.parent.netId;
		this.parent.packetController.sendTo_vision(ADD_BUFF);
	}
	/**
	 * Sending packet to client to remove buff
	 * @private
	 * @param {_Spellchain} spellObject 
	 */
	removeBuffAns(spellObject){
        var REMOVE_BUFF = createPacket('REMOVE_BUFF', 'S2C');
        REMOVE_BUFF.netId = this.parent.netId;
        REMOVE_BUFF.BuffSlot = spellObject.BuffSlot;
        REMOVE_BUFF.BuffNameHash = spellObject.spellHash;
        REMOVE_BUFF.RunTimeRemove = 0;
		this.parent.packetController.sendTo_vision(REMOVE_BUFF);
	}
	buffs = {};
	BuffSlots = 0;
	//addBuff(buffName = 'SummonerHeal'){
	//	//this.buffs[buffName] = new BuffList[buffName](this);
	//}

	/**
	 * Function holding waiting loop to check for buff end
	 * @private
	 * @param {_Spellchain} buff
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
	 * @param {_Spellchain} spellObject
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
	 * @param {_Spellchain} spellObject
	 */
	removeBuffC(spellObject){
		spellObject.buffDeactivate();

		//this.BuffSlots--;
		this.removeBuffAns(spellObject);
		delete this.buffs[spellObject.constructor.name];
	}
	/**
	 * Check if buff is active in buff list
	 * @param {_Spellchain} spellObject
	 * @returns {Boolean}
	 */
	hasBuffC(spellObject){
		return !!this.buffs[spellObject.constructor.name];
	}
	
};
