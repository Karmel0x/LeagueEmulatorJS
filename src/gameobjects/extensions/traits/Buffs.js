const Server = require("../../../app/Server");

/**
 * @typedef {import('../../../game/datamethods/spells/_Spell')} _Spell
 */

/**
 * Trait for units that can be buffed
 */
module.exports = class Buffs {

	/**
	 * 
	 * @param {import('../../units/Unit')} owner 
	 */
	constructor(owner) {
		this.owner = owner;
	}

	/**
	 * Sending packet to client to add buff
	 * @private
	 * @param {_Spell} spellObject 
	 */
	addBuffAns(spellObject) {
		const BuffAdd2 = Server.network.createPacket('BuffAdd2', 'S2C');
		BuffAdd2.netId = this.owner.netId;
		BuffAdd2.buffSlot = spellObject.buffSlot;
		BuffAdd2.buffType = spellObject.buff.buffType;
		BuffAdd2.count = 1;
		BuffAdd2.isHidden = 0;
		BuffAdd2.buffNameHash = spellObject.spellHash;
		BuffAdd2.packageHash = spellObject.packageHash;
		BuffAdd2.runningTime = 0;
		BuffAdd2.duration = spellObject.buff.duration;
		BuffAdd2.casterNetId = this.owner.netId;
		this.owner.packets.toVision(BuffAdd2);
	}

	/**
	 * Sending packet to client to remove buff
	 * @private
	 * @param {_Spell} spellObject 
	 */
	removeBuffAns(spellObject) {
		const BuffRemove2 = Server.network.createPacket('BuffRemove2', 'S2C');
		BuffRemove2.netId = this.owner.netId;
		BuffRemove2.buffSlot = spellObject.buffSlot;
		BuffRemove2.buffNameHash = spellObject.spellHash;
		BuffRemove2.runTimeRemove = 0;
		this.owner.packets.toVision(BuffRemove2);
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
	async buffEnd(buff) {
		if (!buff.EndTime)
			return;

		while (performance.now() < buff.EndTime)
			await Promise.wait(50);

		this.removeBuffC(buff);
	}

	/**
	 * Adding spell to buff list
	 * @param {_Spell} spellObject
	 */
	addBuffC(spellObject) {
		if (!this.buffs[spellObject.constructor.name]) {
			this.buffs[spellObject.constructor.name] = spellObject;
			spellObject.buffSlot = this.BuffSlots++;
			spellObject.buffActivate();
			this.buffs[spellObject.constructor.name].EndTime = performance.now() + spellObject.buff.duration * 1000;
			this.buffEnd(spellObject);
		} else {//todo
			this.buffs[spellObject.constructor.name].EndTime = performance.now() + spellObject.buff.duration * 1000;
		}

		this.addBuffAns(this.buffs[spellObject.constructor.name]);
	}

	//removeBuff(buffName = 'SummonerHeal') {
	//	this.removeBuffAns(this.buffs[buffName]);
	//	delete this.buffs[buffName];
	//}

	/**
	 * Remove buff by spellObject, usually called automatically when spell ends
	 * @param {_Spell} spellObject
	 */
	removeBuffC(spellObject) {
		spellObject.buffDeactivate();

		//this.BuffSlots--;
		this.removeBuffAns(spellObject);
		delete this.buffs[spellObject.constructor.name];
	}

	/**
	 * Check if buff is active in buff list
	 * @param {_Spell} spellObject
	 * @returns 
	 */
	hasBuff(spell) {
		if (typeof spell != 'string')
			spell = spell.constructor.name;

		return !!this.buffs[spell];
	}

};
