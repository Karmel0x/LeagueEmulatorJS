
import type * as packets from '@repo/packets/list';
import type { CastData } from '@repo/scripting/base/spell';
import GameObjectList from '../../app/game-object-list';
import { SlotId } from '../../constants/slot-id';
import config from '../../game/game.config.json';
import type Hero from '../../gameobjects/unit-ai/hero';
import type AttackableUnit from '../../gameobjects/units/attackable-unit';
import Defendable, { type DefendableEvents } from './defendable';


export type SpellableEvents = DefendableEvents & {
	'spellCast': (castData: CastData) => void;
	//'spellCastingEnd': (spellData: any) => void;
};

/**
 * Trait for units that can use spells
 */
export default class Spellable extends Defendable {
	declare readonly owner: AttackableUnit;

	//castingSpell = false;

	constructor(owner: AttackableUnit, respawnable = false) {
		super(owner, respawnable);

		//this.owner.eventEmitter.on('spellCast', (spellData) => {
		//	//console.log('spellCast');
		//	this.castingSpell = true;
		//});
		//
		//this.owner.eventEmitter.on('spellCastingEnd', (spellData) => {
		//	console.log('spellCastingEnd');
		//	this.castingSpell = false;
		//});
	}

	castSpell(packet: packets.CastSpellReqModel) {
		const owner = this.owner;
		const slot = packet.slot;

		if (slot >= SlotId.q && slot <= SlotId.r) {
			const character = owner.character;
			if (!character)
				return;

			const spells = character.spells;
			if (!spells)
				return;

			const spell = spells[slot];
			if (!spell)
				return;

			const spellLevel = owner.progress.spellLevel[slot];
			if (!spellLevel)
				throw new Error('spell has incorrect level');

			//const appTime = Timer.app.now();
			//const cooldownUntil = 0; // TODO: slot vars
			//if (cooldownUntil && cooldownUntil > appTime)
			//	throw new Error('spell is on cooldown');

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

			const manaCost = spell.getManaCost(spellLevel);
			let manaCostReduction = owner.stats.manaCostReduction.total;
			let reducedManaCost = manaCost * (1 + manaCostReduction);
			if (owner.stats.mana.current < reducedManaCost)
				throw new Error('not enough mana');

			//const cooldownTime = spell.getCooldown(spellLevel);
			//let cooldownMod = owner.stats.cooldownMod.total;
			//let reducedCooldown = cooldownTime * (1 + cooldownMod);

			spell.eventEmitter.emit('cast', this.owner, {
				packet,
				spell,
			}, () => {
				// TODO: cooldownUntil = appTime + (reducedCooldown * 1000);
				owner.stats.mana.current -= reducedManaCost;
			});
		}
		else if (slot >= SlotId.d && slot <= SlotId.f) {
			const spells = (owner.ai as Hero).summonerSpells;
			if (!spells)
				return;

			const spell = spells[slot - SlotId.d];
			if (!spell)
				return;

			spell.eventEmitter.emit('cast', this.owner, {
				packet,
				spell,
			});
		}

	}

}
