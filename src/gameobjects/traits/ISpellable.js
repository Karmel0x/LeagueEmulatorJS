
const slotId = require('../../constants/slotId');


/**
 * Trait for units that can use spells
 * @mixin
 * @param {GameObject} I
 */
module.exports = (I) => class ISpellable extends I {


	spellSlots = {};

	constructor(options) {
		super(options);

		this.on('useSlot', (slot, packet) => {
			if (slot >= slotId.Q && slot <= slotId.F)
				this.spellSlots[slot]?.cast({ packet });

			if (slot >= slotId.A && slot <= slotId.A9)
				this.spellSlots[slotId.A]?.cast({ packet });
		});

		this.on('setWaypoints', () => {
			this.emit('cancelSpell');
		});

		this.on('spellCasting', (spellData) => {
			console.log('spellCasting');
			this.castingSpell = true;
			if (!spellData.movingSpell)
				this.waypointsHalt = true;
		});

		this.on('spellCastingEnd', (spellData) => {
			console.log('spellCastingEnd');
			this.castingSpell = false;
			if (!spellData.movingSpell)
				this.waypointsHalt = false;
		});
	}

};
