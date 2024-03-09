
import * as packets from '@workspace/packets/packages/packets';
import { SlotId } from '../../../constants/slot-id';
import TypedEventEmitter from 'typed-emitter';
import Defendable, { DefendableEvents, IDefendable } from './defendable';
import { SpellData } from '../../../game/basedata/spells/spell';


export type SpellableEvents = DefendableEvents & {
	'cancelSpell': () => void;
	'spellCasting': (spellData: SpellData) => void;
	'spellCastingEnd': (spellData: SpellData) => void;
};

export interface ISpellable extends IDefendable {
	eventEmitter: TypedEventEmitter<SpellableEvents>;
	combat: Spellable;
}

/**
 * Trait for units that can use spells
 */
export default class Spellable extends Defendable {
	declare owner: ISpellable;

	castingSpell = false;

	constructor(owner: ISpellable, respawnable = false) {
		super(owner, respawnable);

		this.owner.eventEmitter.on('cancelOrder', () => {
			this.owner.eventEmitter.emit('cancelSpell');
		});

		this.owner.eventEmitter.on('spellCasting', (spellData) => {
			console.log('spellCasting');
			this.castingSpell = true;
		});

		this.owner.eventEmitter.on('spellCastingEnd', (spellData) => {
			console.log('spellCastingEnd');
			this.castingSpell = false;
		});
	}

	castSpell(packet: packets.CastSpellReqModel) {
		let slot = packet.slot;

		if (slot < SlotId.Q || slot > SlotId.F)
			return;

		this.owner.slots[slot]?.cast({ packet });
	}

}
