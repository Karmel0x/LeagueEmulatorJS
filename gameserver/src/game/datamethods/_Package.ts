import _Spell from './spells/_Spell';
import type Unit from '../../gameobjects/units/unit';

/**
 * @abstract
 */
export default class _Package {

	package = {};
	parent;
	owner;

	constructor(parent: Unit) {
		this.parent = parent;
		this.owner = parent.owner || parent.parent || parent;

	}
	get name() {
		return this.constructor.name;
	}

	/**
	 * Constructs castable object, puts it on unit slot and setting it's slot and package
	 */
	createOnSlots(slotToCastable: { [s: string]: object | _Spell; }) {
		for (let key in slotToCastable) {
			this.owner.slots[key] = new slotToCastable[key]({ owner: this.owner });
			this.owner.slots[key].slot = key;
			this.owner.slots[key].package = this.package;
		}
	}
}
