
import { Vector2 } from 'three';
import Missile from './Missile.js';

/**
 * @typedef {import('../../gameobjects/units/Unit.js').default} Unit
 */

class Targetedshot extends Missile {

	/**
	 * 
	 * @param {import('../GameObjects.js').TargetedshotOptions} options 
	 */
	constructor(options) {
		super(options);

	}

	/**
	 * @override
	 * @param {import('../GameObjects.js').DefendableUnit} target
	 */
	reachedDest(target) {
		console.log('Targetedshot.reachedDest');
		this.owner.combat.attack(target);
		this.destructor();
	}
	doFire() {
		this.fire(this.target, this.options.windupPercent ?? 0);
	}
}


export default Targetedshot;
