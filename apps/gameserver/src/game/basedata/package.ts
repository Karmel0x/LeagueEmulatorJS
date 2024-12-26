import _Spell from './spells/spell';
import type AttackableUnit from '../../gameobjects/units/attackable-unit';
import type Unit from '../../gameobjects/units/unit';

/**
 * @abstract
 */
export default class _Package {

	package = {
		packageHash: 0,
	};

	owner: AttackableUnit;

	constructor(owner: AttackableUnit | Unit) {
		//@todo
		this.owner = owner as AttackableUnit;
	}

	get name() {
		return this.constructor.name;
	}

	/**
	 * Constructs castable object, puts it on unit slot and setting it's slot and package
	 */
	createOnSlots(slotToCastable: { [slot: string]: typeof _Spell; }) {
		for (let slot in slotToCastable) {
			this.owner.slots[slot] = new slotToCastable[slot]({ owner: this.owner });
			this.owner.slots[slot].slot = Number(slot);
			this.owner.slots[slot].package = this.package;
		}
	}
}
