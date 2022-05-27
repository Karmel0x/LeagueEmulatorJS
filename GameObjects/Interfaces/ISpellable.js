
const slotId = require('../../Constants/slotId');

/**
 * Interface for units that can use spells.
 * @param {GameObject} I 
 */
module.exports = (I) => class ISpellable extends I {


	spellSlots = {};
	constructor(...args){
		super(...args);

		this.on('useSlot', (slot, packet) => {
			if(slot >= slotId.Q && slot <= slotId.F)
				this.spellSlots[slot]?.cast({packet});

			if(slot >= slotId.A && slot <= slotId.A9)
				this.spellSlots[slotId.A]?.cast({packet});
		});

		this.on('setWaypoints', () => {
			this.emit('cancelSpell');
		});
		this.on('spellCasting', (spellData) => {
			this.castingSpell = true;
			if(!spellData.movingSpell)
				this.halt_start?.();
		});
		this.on('spellCastingEnd', (spellData) => {
			this.castingSpell = true;
			if(!spellData.movingSpell)
				this.halt_stop?.();
		});
	}

};
