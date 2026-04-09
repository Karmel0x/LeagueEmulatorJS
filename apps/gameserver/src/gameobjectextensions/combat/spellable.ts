
import type * as packets from '@repo/packets/list';
import type Spell from '@repo/scripting/base/spell';
import type { CastData, SpellSlotData } from '@repo/scripting/base/spell';
import type { SpellCast } from '@repo/scripting/load/spell-cast';
import GameObjectList from '../../app/game-object-list';
import Server from '../../app/server';
import { ChannelingStopCondition, ChannelingStopSource } from '../../constants/enums';
import { SlotId, SlotType, SpellbookType } from '../../constants/slot-id';
import config from '../../game/game.config';
import type Hero from '../../gameobjects/unit-ai/hero';
import type AttackableUnit from '../../gameobjects/units/attackable-unit';
import Defendable, { type DefendableEvents } from './defendable';


export function getSlotIdByType(type: SlotType, slotNum: number): SlotId {

	if (type === SlotType.spell)
		return slotNum;

	if (type === SlotType.inventory)
		return slotNum + SlotId.i;

	if (type === SlotType.extra)
		return slotNum + SlotId.es1;

	throw new Error('Invalid slot type');
}

export function getSlotData(target: AttackableUnit, slot: SlotId, spellbookType = SpellbookType.champion): SpellSlotData {

	if (spellbookType === SpellbookType.champion) {
		target.combat.slotData[slot] = target.combat.slotData[slot] || {};
		const slotData = target.combat.slotData[slot]!;
		return slotData;
	}

	if (spellbookType === SpellbookType.summoner) {
		target.combat.slotDataSummoner[slot] = target.combat.slotDataSummoner[slot] || {};
		const slotData = target.combat.slotDataSummoner[slot]!;
		return slotData;
	}

	throw new Error(`getSlotData: spellbook not implemented : ${spellbookType}`);
}

export type SpellableEvents = DefendableEvents & {
	'spellCast': (castData: CastData) => void;
	//'spellCastingEnd': (spellData: any) => void;
	'channelingStart': () => void;
	'channelingStop': (stopCondition: ChannelingStopCondition, stopSource: ChannelingStopSource) => void;
};

/**
 * Trait for units that can use spells
 */
export default class Spellable extends Defendable {
	declare readonly owner: AttackableUnit;

	castingSpell: SpellCast[] = [];
	slotData: Partial<Record<SlotId, SpellSlotData>> = {};
	slotDataSummoner: Partial<Record<SlotId, SpellSlotData>> = {};

	constructor(owner: AttackableUnit, respawnable = false) {
		super(owner, respawnable);

		//owner.eventEmitter.on('spellCast', (spellData) => {
		//	//console.log('spellCast');
		//	this.castingSpell = true;
		//});
		//
		//owner.eventEmitter.on('spellCastingEnd', (spellData) => {
		//	console.log('spellCastingEnd');
		//	this.castingSpell = false;
		//});
		//
		//owner.eventEmitter.on('changeOrder', (issuedOrder) => {
		//	this.cancelChanneling(ChannelingStopSource.unknown);
		//});
	}

	canCast(spell: Spell) {
		const owner = this.owner;
		const characterState = owner.characterState;

		if (!spell.canCastWhileDisabled && !characterState.canCast)
			return;
		if (characterState.silenced)
			return;
		if (characterState.sleep)
			return;
		if (characterState.stunned)
			return;
		if (!spell.cannotBeSuppressed && characterState.suppressed)
			return;

		if (characterState.charmed)
			return;
		if (characterState.taunted)
			return;
		if (spell.cantCastWhileRooted && characterState.rooted)
			return;

		return true;
	}

	castSpell(packet: packets.CastSpellReqModel) {
		const slot = packet.slot as SlotId;
		if (slot < SlotId.q || slot > SlotId.r)
			return;

		const owner = this.owner;
		const character = owner.character;
		if (!character)
			return;

		const spells = character.spells;
		if (!spells)
			return;

		let spell = spells[slot];
		if (!spell)
			return;

		const slotData = getSlotData(owner, slot, SpellbookType.champion);

		if (slotData.sealed)
			throw new Error('slot is sealed');

		const spellLevel = slotData.level || owner.progress.spellLevel[slot];
		if (!spellLevel)
			throw new Error('spell has incorrect level');

		const appTime = Server.gameLoop.timer;
		const cooldownUntil = slotData.cooldownUntil;
		if (cooldownUntil && cooldownUntil > appTime)
			throw new Error('spell is on cooldown');

		const overrideSpell = slotData.overrideSpell;
		if (overrideSpell && spell !== overrideSpell) {
			spell = overrideSpell;
		}

		if (!config.testing.enabled || !config.testing.noSpellRangeCheck) {
			const target = GameObjectList.objectByNetId[packet.targetNetId] as AttackableUnit | undefined;
			if (target) {
				const castRange = spell.getCastRange(spellLevel);
				if (castRange) {
					if (owner.distanceTo(target) > castRange) {
						owner.moving.follow(target, castRange);
						owner.moving.onceInRange(() => {
							this.castSpell(packet);
						});
						return;
					}
				}
			}
		}

		let manaCost = spell.getManaCost(spellLevel);
		if (slotData.parCostInc)
			manaCost += slotData.parCostInc;

		let manaCostReduction = owner.stats.manaCostReduction.total;
		let reducedManaCost = manaCost * (1 + manaCostReduction);
		if (owner.stats.mana.current < reducedManaCost)
			throw new Error('not enough mana');

		const cooldownTime = spell.getCooldown(spellLevel);
		let cooldownMod = owner.stats.cooldownMod.total;
		let reducedCooldown = cooldownTime * (1 + cooldownMod);

		spell.cast(owner, {
			packet,
			spell,
			spellSlot: slot,
			spellbookType: SpellbookType.champion,
			slotType: SlotType.spell,
			slotData,
		}, () => {
			slotData.cooldownUntil = appTime + (reducedCooldown * 1000);
			owner.stats.mana.current -= reducedManaCost;
		});
	}

	castSummonerSpell(packet: packets.CastSpellReqModel) {
		const slot = packet.slot as SlotId;
		if (slot < SlotId.d || slot > SlotId.f)
			return;

		const owner = this.owner;
		const spells = (owner.ai as Hero).summonerSpells;
		if (!spells)
			return;

		let spell = spells[slot];
		if (!spell)
			return;

		const slotData = getSlotData(owner, slot, SpellbookType.summoner);

		if (slotData.sealed)
			throw new Error('slot is sealed');

		const spellLevel = 1;
		const appTime = Server.gameLoop.timer;
		const cooldownUntil = slotData.cooldownUntil;
		if (cooldownUntil && cooldownUntil > appTime)
			throw new Error('spell is on cooldown');

		const overrideSpell = slotData.overrideSpell;
		if (overrideSpell && spell !== overrideSpell) {
			spell = overrideSpell;
		}

		if (!config.testing.enabled || !config.testing.noSpellRangeCheck) {
			const target = GameObjectList.objectByNetId[packet.targetNetId] as AttackableUnit | undefined;
			if (target) {
				const castRange = spell.getCastRange(spellLevel);
				if (castRange) {
					if (owner.distanceTo(target) > castRange) {
						owner.moving.follow(target, castRange);
						owner.moving.onceInRange(() => {
							this.castSummonerSpell(packet);
						});
						return;
					}
				}
			}
		}

		const cooldownTime = spell.getCooldown(spellLevel);
		let cooldownMod = owner.stats.cooldownMod.total;
		let reducedCooldown = cooldownTime * (1 + cooldownMod);

		spell.cast(owner, {
			packet,
			spell,
			spellSlot: slot,
			spellbookType: SpellbookType.summoner,
			slotType: SlotType.spell,
			slotData,
		}, () => {
			slotData.cooldownUntil = appTime + (reducedCooldown * 1000);
		});
	}

	cancelChanneling(stopSource: ChannelingStopSource) {
		const owner = this.owner;
		const characterState = owner.characterState;

		if (!characterState.channeling)
			return;

		if (stopSource !== ChannelingStopSource.die) {
			if (characterState.cantCancelChanneling)
				throw new Error('cant cancel channeling');
		}

		owner.eventEmitter.emit('channelingStop', ChannelingStopCondition.cancel, stopSource);
	}

	mpup(source: AttackableUnit, mpupAmount: number) {
		const owner = this.owner;
		this.addAssistMarker(source);

		if (owner.stats.mana.current >= owner.stats.mana.total)
			return;

		owner.stats.mana.current += mpupAmount;
		owner.markReplicateStats();
	}

	mpupPercent(source: AttackableUnit, mpupPercent: number) {
		this.mpup(source, this.owner.stats.mana.total * mpupPercent / 100);
	}

}
