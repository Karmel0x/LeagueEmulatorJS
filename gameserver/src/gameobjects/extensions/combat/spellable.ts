
import * as packets from '@workspace/packets/packages/packets';
import { SlotId } from '../../../constants/slot-id';
import Attackable, { AttackableEvents, IAttackable } from './attackable';
import TypedEventEmitter from 'typed-emitter';


export type SpellableEvents = AttackableEvents & {
	'cancelSpell': () => void;
	'spellCasting': (spellData: packets.CastSpellReqModel) => void;
	'spellCastingEnd': (spellData: packets.CastSpellReqModel) => void;
}

export interface ISpellable extends IAttackable {
	eventEmitter: TypedEventEmitter<SpellableEvents>;
	combat: Spellable;
}

/**
 * Trait for units that can use spells
 */
export default class Spellable extends Attackable {
	declare owner: ISpellable;

	castingSpell = false;

	constructor(owner: ISpellable) {
		super(owner);

		this.owner.eventEmitter.on('setWaypoints', () => {
			this.owner.eventEmitter.emit('cancelSpell');
		});

		this.owner.eventEmitter.on('spellCasting', (spellData) => {
			console.log('spellCasting');
			this.castingSpell = true;
			if (!spellData.movingSpell)
				this.waypointsHalt = true;
		});

		this.owner.eventEmitter.on('spellCastingEnd', (spellData) => {
			console.log('spellCastingEnd');
			this.castingSpell = false;
			if (!spellData.movingSpell)
				this.waypointsHalt = false;
		});
	}

	castSpell(packet: packets.CastSpellReqModel) {
		let slot = packet.slot;

		if (slot < SlotId.Q || slot > SlotId.F)
			return;

		this.owner.slots[slot]?.cast({ packet });
	}

}
