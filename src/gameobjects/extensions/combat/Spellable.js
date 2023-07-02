
const slotId = require('../../../constants/slotId');
const Attackable = require('./Attackable');


/**
 * Trait for units that can use spells
 */
module.exports = class Spellable extends Attackable {

	/**
	 * 
	 * @param {import('../../GameObjects').SpellableUnit} owner 
	 */
	constructor(owner) {
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

};
