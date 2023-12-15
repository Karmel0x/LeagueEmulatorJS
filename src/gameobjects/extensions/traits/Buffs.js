
import packets from '../../../packets/index.js';

/**
 * @typedef {import('../../../game/datamethods/spells/_Spell.js')} _Spell
 */

/**
 * Trait for units that can be buffed
 */
export default class Buffs {

	/**
	 * 
	 * @param {import('../../units/Unit.js').default} owner 
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
		const packet1 = new packets.BuffAdd2();
		packet1.netId = this.owner.netId;
		packet1.buffSlot = spellObject.buffSlot;
		packet1.buffType = spellObject.buff.buffType;
		packet1.count = 1;
		packet1.isHidden = 0;
		packet1.buffNameHash = spellObject.spellHash;
		packet1.packageHash = spellObject.packageHash;
		packet1.runningTime = 0;
		packet1.duration = spellObject.buff.duration;
		packet1.casterNetId = this.owner.netId;
		this.owner.packets.toVision(packet1);
	}

	/**
	 * Sending packet to client to remove buff
	 * @private
	 * @param {_Spell} spellObject 
	 */
	removeBuffAns(spellObject) {
		const packet1 = new packets.BuffRemove2();
		packet1.netId = this.owner.netId;
		packet1.buffSlot = spellObject.buffSlot;
		packet1.buffNameHash = spellObject.spellHash;
		packet1.runTimeRemove = 0;
		this.owner.packets.toVision(packet1);
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

}
