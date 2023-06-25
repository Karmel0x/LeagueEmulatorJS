
/**
 * @abstract
 */
module.exports = class _Package {

	package = {};
	constructor(parent) {
		this.parent = parent;
		this.owner = parent.owner || parent.parent || parent;

	}
	get name() {
		return this.constructor.name;
	}

	/**
	 * Constructs castable object, puts it on unit slot and setting it's slot and package
	 * @param {Object.<string, object | Spell>} slotToCastable {slot: castable}
	 */
	createOnSlots(slotToCastable) {
		for (var key in slotToCastable) {
			this.owner.spellSlots[key] = new slotToCastable[key]({ owner: this.owner });
			this.owner.spellSlots[key].slot = key;
			this.owner.spellSlots[key].package = this.package;
		}
	}
};
