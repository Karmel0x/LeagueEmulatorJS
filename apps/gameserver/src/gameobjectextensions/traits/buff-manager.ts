
import { BuffType } from '@repo/packets/base/s2c/0x68-BuffAddGroup';
import type Spell from '@repo/scripting/base/spell';
import type { BuffVars } from '@repo/scripting/base/spell';
import Server from '../../app/server';
import { runAccurateInterval } from '../../core/timer';
import type { Player } from '../../gameobjects/unit-ai';
import type AttackableUnit from '../../gameobjects/units/attackable-unit';
import { sendBuffAdd, sendBuffRemove } from '../../packet-helpers/buff';
import type { AllowAddBuff } from '../combat/defendable';


const MaxSpellBuffs = 0x40;

export enum BuffAddType {
	/**
	 * 1. buff exists: deactivate buff
	 * 2. activate new buff
	 * 3. on timer end: deactivate buff
	 */
	replaceExisting = 0x0,
	/**
	 * 1. buff exists: reset timer
	 * 2. buff not exists: activate new buff
	 * 3. on timer end: deactivate buff
	 */
	renewExisting = 0x1,
	/**
	 * 1. existing buffs: reset timer
	 * 2. activate new buff
	 * 3. on timer end: deactivate all buffs
	 * it has to emit activateBuff
	 * it has to emit deactivateBuff on every stack
	 */
	stacksAndRenews = 0x2,
	/**
	 * 1. buff exists: add stack
	 * 2. buff not exists: activate new buff
	 * 3. on timer end: one stack ends
	 */
	stacksAndContinue = 0x3,
	/**
	 * 1. buff is independent of other stacks
	 * 2. buff exists: renews
	 * 3. on timer end: deactivate buff (one stack)
	 */
	stacksAndOverlaps = 0x4,
}

export type BuffAddOptions = {
	addType: BuffAddType;
	buffType: BuffType;
	maxStack: number;
	numberOfStacks: number;
	/**
	 * exclusive by attacker?
	 * TODO: check if also exclusive by spell/buff name
	 */
	stacksExclusive?: boolean;
	duration: number;
	tickRate?: number;
	canMitigateDuration?: boolean;
	persistsThroughDeath?: boolean;
};

export type BuffStack = {
	options: BuffAddOptions;
	renewTime: number;
	attacker: AttackableUnit;
	instanceVars: any;
};

const negativeBufftypes = [
	BuffType.combatDehancer,
	BuffType.stun,
	BuffType.silence,
	BuffType.taunt,
	BuffType.polymorph,
	BuffType.slow,
	BuffType.snare,
	BuffType.damage,
	BuffType.sleep,
	BuffType.nearSight,
	BuffType.fear,
	BuffType.charm,
	BuffType.poison,
	BuffType.suppression,
	BuffType.blind,
];

export class BuffStackInstance {
	active = false;
	attacker: AttackableUnit;
	instanceVars: any;

	constructor(attacker: AttackableUnit, instanceVars: any) {
		this.attacker = attacker;
		this.instanceVars = instanceVars;
	}
}

export type BuffInstanceOptions = {
	spell: Spell;
	slot: number;
	addOptions: BuffAddOptions;
};

export class BuffInstance {
	readonly buffManager: BuffManager;

	readonly slot: number;
	readonly spell: Spell;

	readonly addTime: number;
	renewTime: number;

	readonly addOptions: BuffAddOptions;
	readonly stacks: BuffStackInstance[] = [];

	constructor(buffManager: BuffManager, options: BuffInstanceOptions) {
		this.buffManager = buffManager;

		this.slot = options.slot;
		this.spell = options.spell;

		const now = Server.gameLoop.timer;
		this.addTime = now;
		this.renewTime = now;

		this.addOptions = options.addOptions;
	}

	get owner() {
		return this.buffManager.owner;
	}

	get type() {
		return this.addOptions.buffType;
	}

	get stacking() {
		return this.addOptions.addType === BuffAddType.stacksAndRenews
			|| this.addOptions.addType === BuffAddType.stacksAndContinue
			|| this.addOptions.addType === BuffAddType.stacksAndOverlaps;
	}

	get stacksOverlap() {
		return this.addOptions.addType === BuffAddType.stacksAndOverlaps;
	}

	get count() {
		return this.stacks.length;
	}

	get maxStack() {
		return this.addOptions.maxStack;
	}

	get duration() {
		return this.addOptions.duration;
	}

	isActive() {
		return this.buffManager.buffs.includes(this);
	}

	isPositive() {
		return negativeBufftypes.includes(this.addOptions.buffType);
	}

	isPermanent() {
		return this.duration > (20000 * 1000);
	}

	remainingDuration() {
		const now = Server.gameLoop.timer;
		//return this.endTime - now;
		return this.renewTime + this.duration - now;
	}

	lifeTime() {
		const now = Server.gameLoop.timer;
		const lt = now - this.addTime;
		return lt > 0 ? lt : 0;
	}

	isExpired() {
		return this.remainingDuration() <= 0;
	}

	resetDuration(duration = 0) {
		if (duration)
			this.addOptions.duration = duration;

		const now = Server.gameLoop.timer;
		this.renewTime = now;
		this.markToSend();
	}

	//getFullDuration(){
	//	//return this.endTime - this.startTime;
	//	return this.duration;
	//}

	markToSend() {
		const markedToSend = this.buffManager.markedToSend;
		if (!markedToSend.includes(this))
			markedToSend.push(this);
	}

	addStack(stack: BuffStackInstance) {
		const stacks = this.stacks;
		if (stacks.length >= this.maxStack)
			return;

		const index = stacks.indexOf(stack);
		if (index !== -1)
			return;

		stacks.push(stack);
		this.markToSend();

		if (!stack.active) {
			stack.active = true;
			const spell = this.spell;
			const owner = this.owner;
			spell.eventEmitter.emit('buffActivate', owner, this, stack);
		}
	}

	private remove() {
		const buffs = this.buffManager.buffs;

		const index = buffs.indexOf(this);
		if (index === -1)
			return;

		buffs.splice(index, 1);
		this.markToSend();

		const spell = this.spell;
		const owner = this.owner;
		spell.eventEmitter.emit('buffRemove', owner, this);
	}

	removeStack(stack: BuffStackInstance) {
		const stacks = this.stacks;

		const index = stacks.indexOf(stack);
		if (index === -1)
			return;

		stacks.splice(index, 1);
		this.markToSend();

		if (stack.active) {
			stack.active = false;
			const spell = this.spell;
			const owner = this.owner;
			spell.eventEmitter.emit('buffDeactivate', owner, this, stack);
		}

		if (stacks.length < 1) {
			this.remove();
		}
	}

	removeStacks(count: number | undefined = undefined) {
		const stacks = [...this.stacks];
		count = count ?? stacks.length;

		for (let i = 0; i < count; i++) {
			const stack = stacks[i];
			if (!stack) continue;

			this.removeStack(stack);
		}

		const removed = stacks.length - this.stacks.length;
		return removed;
	}

	updateStats() {
		const spell = this.spell;
		const stacks = [...this.stacks];

		for (let i = 0; i < stacks.length; i++) {
			const stack = stacks[i]!;
			if (!stack.active) continue;

			spell.eventEmitter.emit('buffUpdateStats', this.owner, this, stack);

			if (this.stacksOverlap)
				break;
		}
	}

	updateActions() {
		const spell = this.spell;
		const stacks = [...this.stacks];

		for (let i = 0; i < stacks.length; i++) {
			const stack = stacks[i]!;
			if (!stack.active) continue;

			spell.eventEmitter.emit('buffUpdateActions', this.owner, this, stack);

			if (this.stacksOverlap)
				break;
		}
	}
};

export default class BuffManager {

	readonly owner;
	readonly buffs: BuffInstance[] = [];
	readonly markedToSend: BuffInstance[] = [];

	constructor(owner: AttackableUnit) {
		this.owner = owner;

		owner.eventEmitter.on('death', () => {
			const buffs = this.buffs.filter(buff => !(buff.addOptions.persistsThroughDeath ?? buff.spell.persistsThroughDeath));
			this.dispell(buffs);
		});

		const task1 = Server.gameLoop.add(() => {
			const markedToSend = this.markedToSend;
			if (markedToSend.length < 1)
				return;

			for (; ;) {
				const buff = markedToSend.shift();
				if (!buff) break;

				this.sendBuffState(buff);
			}

			owner.refreshStats();
		});

		owner.eventEmitter.once('destroy', () => {
			Server.gameLoop.remove(task1);
		});

	}

	sendBuffState(buff: BuffInstance) {
		const owner = this.owner;
		if (owner.characterState.noRender || owner.character.neverRender)
			return;

		const { spell, addOptions, count } = buff;

		////if (!Server.debug)
		//if (addOptions.buffType === BuffType.internal)
		//	return;

		const spellName = spell.name;
		//(owner.ai as Player)?.packets?.chatBoxDebugMessage('BuffManager.sendBuffState.owner', spellName, count);
		//(buff.stacks[0]?.attacker.ai as Player)?.packets?.chatBoxDebugMessage('BuffManager.sendBuffState', spellName, count);

		if (!count) {
			sendBuffRemove(owner, {
				nameHash: spellName,
				slot: buff.slot,
			});
			return;
		}

		const firstStack = buff.stacks[0];
		const now = Server.gameLoop.timer;

		sendBuffAdd(owner, {
			nameHash: spellName,
			slot: buff.slot,
			type: addOptions.buffType,
			count,
			isHidden: 0,// TODO
			runningTime: (now - buff.renewTime) / 1000,
			duration: buff.remainingDuration() / 1000,
			casterNetId: firstStack?.attacker.netId,
		});
	}

	async buffCheckLoop(buff: BuffInstance) {
		if (buff.isPermanent())
			return;

		const owner = this.owner;

		const task1 = Server.gameLoop.add((updateTime) => {
			const buffs = this.buffs;
			const index = buffs.indexOf(buff);
			if (index === -1) {
				Server.gameLoop.remove(task1);
				owner.eventEmitter.off('destroy', event1);
				return;
			}

			const remainingDuration = buff.remainingDuration();
			if (remainingDuration <= 0) {
				if (buff.type === BuffType.counter) {
					buff.resetDuration();
					owner.eventEmitter.emit('updateAmmo');
					return;
				}

				const continues = buff.addOptions.addType === BuffAddType.stacksAndContinue;
				if (continues) {
					buff.removeStacks(1);
					buff.resetDuration();
				} else {
					buff.removeStacks();
				}

				if (buff.count < 1) {
					Server.gameLoop.remove(task1);
					owner.eventEmitter.off('destroy', event1);
					return;
				}
			}
		});

		const event1 = owner.eventEmitter.once2('destroy', () => {
			Server.gameLoop.remove(task1);
		});
	}

	buffUpdateLoop(buff: BuffInstance) {
		const owner = this.owner;

		const tr = buff.addOptions.tickRate;
		const delay = (tr || 0.25) * 1000;// TODO: verify this
		let lastUpdateStats = 0;

		const updateStats = owner.eventEmitter.on2('updateStats', (updateTime) => {
			if (buff.count < 1) {
				owner.eventEmitter.off('updateStats', updateStats);
				return;
			}

			if (!tr || !updateTime) {
				buff.updateStats();
				return;
			}

			const elapsed = updateTime - lastUpdateStats;
			if (elapsed >= delay) {
				lastUpdateStats = updateTime;
				buff.updateStats();
				return;
			}
		});

		const stopBuffUpdateActions = runAccurateInterval(() => {
			if (buff.count < 1) {
				stopBuffUpdateActions();
				owner.eventEmitter.off('destroy', event1);
				return;
			}

			buff.updateActions();
		}, delay);

		const event1 = owner.eventEmitter.once2('destroy', () => {
			stopBuffUpdateActions();
		});
	}

	findFreeSlot() {
		const slots = this.buffs.map(b => b.slot);

		for (let i = 0; i < MaxSpellBuffs; i++) {
			if (!slots.includes(i))
				return i;
		}
	}

	allowAddCheck(spell: Spell, attacker: AttackableUnit, options: BuffAddOptions) {
		const owner = this.owner;

		const e: AllowAddBuff = {
			allowAddBuff: true,
		};

		owner.eventEmitter.emit('checkAllowAddBuff', attacker, options, e);

		if (!e.allowAddBuff) {
			let chattarget = (attacker.ai as Player).packets || (owner.ai as Player).packets;
			if (chattarget)
				chattarget.chatBoxDebugMessage('BuffManager.allowAddCheck', spell.name, false);
			else
				console.log('BuffManager.allowAddCheck', spell.name, false);

			return false;
		}

		return true;
	}

	addStacks(buff: BuffInstance, count: number, attacker: AttackableUnit, instanceVars: BuffVars = {}) {
		for (let i = 0; i < count; i++) {
			if (buff.count >= buff.maxStack) {
				buff.resetDuration();
				break;
			}

			const stack = new BuffStackInstance(attacker, instanceVars);
			buff.addStack(stack);
		}
	}

	addBuff(spell: Spell, attacker: AttackableUnit, options: BuffAddOptions, instanceVars: BuffVars = {}) {
		if (!this.allowAddCheck(spell, attacker, options))
			return false;

		const spellName = spell.name;

		if (BuffAddType[options.addType] === undefined)
			throw new Error(`BuffManager.addBuff: incorrect BuffAddType ${options.addType} : ${spellName}`);

		let existingBuff = this.findBuffByName(spellName);

		if (existingBuff) {
			if (options.addType === BuffAddType.renewExisting) {
				this.addStacks(existingBuff, options.numberOfStacks, attacker, instanceVars);

				if (options.canMitigateDuration) {
					existingBuff.addOptions.duration = options.duration;
				} else {
					existingBuff.addOptions.duration = Math.max(existingBuff.addOptions.duration, options.duration);
				}

				return;
			}

			if (options.addType === BuffAddType.stacksAndRenews) {
				if (options.canMitigateDuration) {
					existingBuff.addOptions.duration = options.duration;
				} else {
					existingBuff.addOptions.duration = Math.max(existingBuff.addOptions.duration, options.duration);
				}

				existingBuff.resetDuration();
			}
			else if (options.addType === BuffAddType.stacksAndOverlaps) {
				//if (options.stacksExclusive) {
				const attackerStack = existingBuff.stacks.find(v => v.attacker === attacker);
				if (!attackerStack) {
					existingBuff = undefined;
				}
				//}

				if (existingBuff) {
					//existingBuff.resetDuration();
					this.addStacks(existingBuff, options.numberOfStacks, attacker, instanceVars);

					if (options.canMitigateDuration) {
						existingBuff.addOptions.duration = options.duration;
					} else {
						existingBuff.addOptions.duration = Math.max(existingBuff.addOptions.duration, options.duration);
					}

					return;
				}
			}
			else if (options.addType === BuffAddType.replaceExisting) {
				existingBuff.removeStacks();
				existingBuff = undefined;
			}
		}

		const newSlot = existingBuff?.slot ?? this.findFreeSlot();
		if (newSlot === undefined)
			throw new Error(`BuffManager.addBuff: no free slot for ${spellName}`);

		let buff = existingBuff;
		let renew = false;
		if (!buff) {
			buff = new BuffInstance(this, {
				spell,
				slot: newSlot,
				addOptions: options,
			});

			renew = true;
			this.buffs.push(buff);

			spell.eventEmitter.emit('buffAdd', this.owner, buff);
			this.buffCheckLoop(buff);
			this.buffUpdateLoop(buff);
		}

		this.addStacks(buff, options.numberOfStacks, attacker, instanceVars);

		if (renew) {
			// TODO: change this dirty fix - renewTime should be taken after buffActivate?
			let now = Server.gameLoop.timer;
			buff.renewTime = now;
		}

		buff.markToSend();
		return buff;
	}

	findBuff(spell: Spell | string) {
		if (!spell) return;

		if (typeof spell === 'string') {
			const spellName = spell.toLowerCase();
			const existingBuff = this.buffs.find(v => v.spell.name.toLowerCase() === spellName);
			return existingBuff;
		}

		const spellName = spell.name;
		const existingBuff = this.buffs.find(v => v.spell.name === spellName);
		return existingBuff;
	}

	hasBuff(spell: Spell | string) {
		return !!this.findBuff(spell);
	}

	findBuffByName(name: string) {
		name = name.toLowerCase();
		return this.buffs.find(b => b.spell.name.toLowerCase() === name);
	}

	findBuffsByName(name: string) {
		name = name.toLowerCase();
		return this.buffs.filter(b => b.spell.name.toLowerCase() === name);
	}

	findBuffsByType(type: BuffType) {
		return this.buffs.filter(b => b.type === type);
	}

	//findBuffsByTypes(buffTypes: BuffType[]) {
	//	return this.buffs.filter(b => buffTypes.includes(b.type));
	//}

	findPositive() {
		return this.buffs.filter(buff => buff.isPositive());
	}

	findNegative() {
		return this.buffs.filter(buff => !buff.isPositive());
	}

	findPersistent() {
		return this.buffs.filter(buff => buff.isPermanent());
	}

	dispell(buffs: BuffInstance[]) {
		buffs = [...buffs];

		for (let i = 0; i < buffs.length; i++) {
			const buff = buffs[i]!;
			buff.removeStacks();
		}
	}

	dispellPositive() {
		const buffs = this.findPositive();
		this.dispell(buffs);
	}

	dispellNegative() {
		const buffs = this.findNegative();
		this.dispell(buffs);
	}

	dispellPersistent() {
		const buffs = this.findPersistent();
		this.dispell(buffs);
	}

	removeStacks(buffs: BuffInstance[], removeCount = 0) {
		buffs = [...buffs];

		for (let i = 0; i < buffs.length; i++) {
			const buff = buffs[i]!;
			removeCount -= buff.removeStacks(removeCount);

			if (buff.count > 0 || removeCount < 1)
				break;
		}
	}

	resetDurations(buffs: BuffInstance[], duration = 0) {
		for (let i = 0; i < buffs.length; i++) {
			const buff = buffs[i]!;
			buff.resetDuration(duration);
		}
	}

}
