
import * as packets from '@workspace/packets/packages/packets';

import _Spell from '../../../game/basedata/spells/spell';
import Unit from '../../units/unit';
import _Buff from '../../../game/basedata/spells/buff';

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
	addBuffAns(spellObject: _Buff) {
		const packet1 = packets.BuffAdd2.create({
			netId: this.owner.netId,
			slot: spellObject.buffSlot,
			type: spellObject.buff.buffType,
			count: 1,
			isHidden: 0,
			nameHash: spellObject.spellHash,
			packageHash: spellObject.packageHash,
			runningTime: 0,
			duration: spellObject.buff.duration,
			casterNetId: this.owner.netId,
		});
		this.owner.packets.toVision(packet1);
	}

	/**
	 * Sending packet to client to remove buff
	 * @private
	 */
	removeBuffAns(spellObject: _Buff) {
		const packet1 = packets.BuffRemove2.create({
			netId: this.owner.netId,
			slot: spellObject.buffSlot,
			nameHash: spellObject.spellHash,
			runTimeRemove: 0,
		});
		this.owner.packets.toVision(packet1);
	}

	buffs: { [name: string]: _Buff } = {};
	BuffSlots = 0;
	//addBuff(buffName = 'SummonerHeal'){
	//	//this.buffs[buffName] = new BuffList[buffName](this);
	//}

	/**
	 * Function holding waiting loop to check for buff end
	 * @private
	 */
	async buffEnd(buff: _Buff) {
		if (!buff.endTime)
			return;

		while (performance.now() < buff.endTime)
			await Promise.delay(50);

		this.removeBuffC(buff);
	}

	/**
	 * Adding spell to buff list
	 */
	addBuffC(spellObject: _Buff) {
		if (!this.buffs[spellObject.constructor.name]) {
			this.buffs[spellObject.constructor.name] = spellObject;
			spellObject.buffSlot = this.BuffSlots++;
			spellObject.buffActivate();
			this.buffs[spellObject.constructor.name].endTime = performance.now() + spellObject.buff.duration * 1000;
			this.buffEnd(spellObject);
		} else {//todo
			this.buffs[spellObject.constructor.name].endTime = performance.now() + spellObject.buff.duration * 1000;
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
	removeBuffC(spellObject: _Buff) {
		spellObject.buffDeactivate();

		//this.BuffSlots--;
		this.removeBuffAns(spellObject);
		delete this.buffs[spellObject.constructor.name];
	}

	/**
	 * Check if buff is active in buff list
	 */
	hasBuff(spell: _Buff | string) {
		if (typeof spell != 'string')
			spell = spell.constructor.name;

		return !!this.buffs[spell];
	}

}
