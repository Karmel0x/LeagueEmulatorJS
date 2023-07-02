
const { Vector2 } = require('three');
const Missile = require('./Missile');

/**
 * @typedef {import('../../gameobjects/units/Unit')} Unit
 */

class Targetedshot extends Missile {

	/**
	 * 
	 * @param {import('../GameObjects').TargetedshotOptions} options 
	 */
	constructor(options) {
		super(options);

	}

	/**
	 * @override
	 * @param {import('../GameObjects').DefendableUnit} target
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


module.exports = Targetedshot;
