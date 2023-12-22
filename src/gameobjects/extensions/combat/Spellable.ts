
import slotId from '../../../constants/slotId';
import { SpellableUnit } from '../../GameObjects';
import Attackable from './Attackable';


/**
 * Trait for units that can use spells
 */
export default class Spellable extends Attackable {

	constructor(owner: SpellableUnit) {
		super(owner);

		this.owner.on('setWaypoints', () => {
			this.owner.emit('cancelSpell');
		});

		this.owner.on('spellCasting', (spellData) => {
			console.log('spellCasting');
			this.castingSpell = true;
			if (!spellData.movingSpell)
				this.waypointsHalt = true;
		});

		this.owner.on('spellCastingEnd', (spellData) => {
			console.log('spellCastingEnd');
			this.castingSpell = false;
			if (!spellData.movingSpell)
				this.waypointsHalt = false;
		});
	}

	castSpell(packet) {
		let slot = packet.slot;

		if (slot < slotId.Q || slot > slotId.F)
			return;

		this.owner.slots[slot]?.cast({ packet });
	}

}
