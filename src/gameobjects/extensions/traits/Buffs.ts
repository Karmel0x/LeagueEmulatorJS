
import packets from '../../../packets/index';

import _Spell from '../../../game/datamethods/spells/_Spell';
import Unit from '../../units/Unit';

/**
 * Trait for units that can be buffed
 */
export default class Buffs {

	owner;

	constructor(owner: Unit) {
		this.owner = owner;
	}

	/**
	 * Sending packet to client to add buff
	 * @private
	 */
	addBuffAns(spellObject: _Spell) {
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
	 */
	removeBuffAns(spellObject: _Spell) {
		const packet1 = new packets.BuffRemove2();
		packet1.netId = this.owner.netId;
		packet1.buffSlot = spellObject.buffSlot;
		packet1.buffNameHash = spellObject.spellHash;
		packet1.runTimeRemove = 0;
		this.owner.packets.toVision(packet1);
	}

	buffs: { [name: string]: _Spell } = {};
	BuffSlots = 0;
	//addBuff(buffName = 'SummonerHeal'){
	//	//this.buffs[buffName] = new BuffList[buffName](this);
	//}

	/**
	 * Function holding waiting loop to check for buff end
	 * @private
	 */
	async buffEnd(buff: _Spell) {
		if (!buff.EndTime)
			return;

		while (performance.now() < buff.EndTime)
			await Promise.wait(50);

		this.removeBuffC(buff);
	}

	/**
	 * Adding spell to buff list
	 */
	addBuffC(spellObject: _Spell) {
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
	 */
	removeBuffC(spellObject: _Spell) {
		spellObject.buffDeactivate();

		//this.BuffSlots--;
		this.removeBuffAns(spellObject);
		delete this.buffs[spellObject.constructor.name];
	}

	/**
	 * Check if buff is active in buff list
	 */
	hasBuff(spell: _Spell | string) {
		if (typeof spell != 'string')
			spell = spell.constructor.name;

		return !!this.buffs[spell];
	}

}
