
import * as packets from '@repo/packets/list';
import { SlotId } from '../../../constants/slot-id';
import type { CastData } from '../../../game/basedata/spell';
import type Hero from '../../unit-ai/hero';
import type AttackableUnit from '../../units/attackable-unit';
import Defendable, { DefendableEvents } from './defendable';


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
		const slot = packet.slot;

		if (slot >= SlotId.q && slot <= SlotId.r) {
			const character = this.owner.character;
			if (!character)
				return;

			const spells = character.spells;
			if (!spells)
				return;

			const spell = spells[slot];
			if (!spell)
				return;

			spell.eventEmitter.emit('cast', this.owner, {
				packet,
				spell,
			});
		}
		else if (slot >= SlotId.d && slot <= SlotId.f) {
			const spells = (this.owner.ai as Hero).summonerSpells;
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
