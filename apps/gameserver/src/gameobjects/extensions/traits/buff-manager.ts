
import { BuffType } from '@repo/packets/base/s2c/0x68-BuffAddGroup';
import type Spell from '@repo/scripting/base/spell';
import Server from '../../../app/server';
import Timer, { accurateDelay } from '../../../core/timer';
import { sendBuffAdd, sendBuffRemove } from '../../../packet-helpers/buff';
import type AttackableUnit from '../../units/attackable-unit';


const MaxSpellBuffs = 0x40;

export enum BuffAddType {
	replaceExisting = 0x0,
	renewExisting = 0x1,
	stacksAndRenews = 0x2,
	stacksAndContinue = 0x3,
	stacksAndOverlaps = 0x4,
}

export type BuffAddOptions = {
	addType: BuffAddType;
	buffType: BuffType;
	maxStack: number;
	numberOfStacks: number;
	duration: number;
	tickRate?: number;
	/**
	 * @todo
	 */
	persistsThroughDeath?: boolean;
};

type BuffData = {
	spell: Spell;
	options: BuffAddOptions;
	slot: number;
	stacks: number;
	duration: number;
	overlaps: number;
	activateTime: number;
};

export default class BuffManager {

	readonly owner;
	readonly buffs: { [name: string]: BuffData } = {};

	constructor(owner: AttackableUnit) {
		this.owner = owner;
	}

	buffRemainingDuration(buff: BuffData) {
		const leftOverlapsDur = buff.duration * (buff.overlaps + 1);
		const dur = leftOverlapsDur - (Timer.app.now() - buff.activateTime);
		return dur > 0 ? dur : 0;
	}

	async buffCheckLoop(buff: BuffData) {
		while (true) {
			const tr = buff.options.tickRate;
			await accurateDelay(tr ? (tr * 1000) : (1000 / 4));// TODO: verify this

			if (buff.stacks <= 0 && buff.overlaps <= 0)
				break;

			const leftDur = this.buffRemainingDuration(buff);
			if (leftDur <= 0)
				break;

			buff.spell.eventEmitter.emit('buffUpdateActions', this.owner);
		}

		this.removeBuff(buff);
	}

	findFreeSlot() {
		const buffs = Object.values(this.buffs);
		const slots = buffs.map(b => b.slot);

		for (let i = 0; i < MaxSpellBuffs; i++) {
			if (!slots.includes(i))
				return i;
		}
	}

	sendBuffState(buff: BuffData) {
		const options = buff.options;

		if (options.buffType === BuffType.internal && !Server.debug)
			return;

		const spell = buff.spell;
		const spellName = spell.name;
		const count = buff.stacks || buff.overlaps;

		if (count) {
			sendBuffAdd(this.owner, {
				nameHash: spellName,
				slot: buff.slot,
				type: options.buffType,
				count,
				isHidden: 0,
				runningTime: (Timer.app.now() - buff.activateTime) / 1000,
				duration: options.duration,
				casterNetId: this.owner.netId,
			});
		}
		else {
			sendBuffRemove(this.owner, {
				nameHash: spellName,
				slot: buff.slot,
			});
		}
	}

	addBuff(spell: Spell, attacker: AttackableUnit, options: BuffAddOptions, buffVars: any = undefined) {
		const spellName = spell.name;
		let buffAdd = false;

		if (!this.buffs[spellName]) {
			const freeSlot = this.findFreeSlot();
			if (freeSlot === undefined) {
				console.error(`BuffManager.addBuff: no free slot for ${spellName}`);
				return;
			}

			this.buffs[spellName] = {
				spell,
				options,
				slot: freeSlot,
				stacks: 0,
				duration: 0,
				overlaps: 0,
				activateTime: Timer.app.now(),
			};

			buffAdd = true;
		}

		const buff = this.buffs[spellName];
		const beforeCount = buff.stacks || buff.overlaps;
		const beforeDuration = buff.duration;

		if (options.addType === BuffAddType.replaceExisting) {
			buff.options = options;
			buff.activateTime = Timer.app.now();
			buff.stacks = options.numberOfStacks;

		}
		else if (options.addType === BuffAddType.renewExisting) {
			buff.activateTime = Timer.app.now();
			buff.stacks = options.numberOfStacks;
		}
		else if (options.addType === BuffAddType.stacksAndRenews) {
			buff.activateTime = Timer.app.now();
			buff.stacks += options.numberOfStacks;
		}
		else if (options.addType === BuffAddType.stacksAndContinue) {
			buff.stacks += options.numberOfStacks;
		}
		else if (options.addType === BuffAddType.stacksAndOverlaps) {
			buff.activateTime = Timer.app.now();
			buff.overlaps += options.numberOfStacks;
		}

		buff.stacks = Math.min(buff.stacks, options.maxStack);
		buff.overlaps = Math.min(buff.overlaps, options.maxStack);
		buff.duration = options.duration * 1000;

		if (buffAdd) {
			this.buffCheckLoop(buff);
			spell.eventEmitter.emit('buffAdd', this.owner);

			if (!options.persistsThroughDeath) {
				const endOnDeath = this.owner.eventEmitter.on2('death', () => {
					buff.stacks = 0;
					buff.overlaps = 0;
				});

				const buffRemove = spell.eventEmitter.once2('buffRemove', (owner2) => {
					if (this.owner !== owner2)
						return;

					spell.eventEmitter.off('buffRemove', buffRemove);
					this.owner.eventEmitter.off('death', endOnDeath);
				});
			}
		} else {
			spell.eventEmitter.emit('buffDeactivate', this.owner);
		}

		spell.eventEmitter.emit('buffActivate', this.owner, attacker, buffVars);

		// TODO: left time instead of beforeDuration < 10000
		const count = buff.stacks || buff.overlaps;
		if (buffAdd || beforeCount !== count || beforeDuration < 10000) {
			this.sendBuffState(buff);
		}

		return buffAdd;
	}

	deactivateBuff(buff: BuffData, count = 0) {
		if (buff.stacks) {
			if (count) {
				buff.stacks = Math.max(buff.stacks - count, 0);
			}
			else {
				buff.stacks = 0;
			}
		} else {
			if (count) {
				buff.overlaps = Math.max(buff.overlaps - count, 0);
			}
			else {
				buff.overlaps = 0;
			}
		}

		this.sendBuffState(buff);
	}

	private removeBuff(buff: BuffData) {
		const { spell } = buff;
		const spellName = spell.name;

		// TODO: do not send two times
		this.sendBuffState(buff);
		delete this.buffs[spellName];
		spell.eventEmitter.emit('buffRemove', this.owner);
	}

	findBuff(spell: Spell | string) {
		if (!spell) return;
		const spellName = typeof spell === 'string' ? spell : spell.name;
		return this.buffs[spellName];
	}

	hasBuff(spell: Spell | string) {
		return !!this.findBuff(spell);
	}

	findBuffsByTypes(buffTypes: BuffType[]) {
		return Object.values(this.buffs).filter(b => buffTypes.includes(b.options.buffType));
	}

}
