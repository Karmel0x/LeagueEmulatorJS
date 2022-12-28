
const { Vector2 } = require('three');
const Missile = require('./Missile');


class Targetedshot extends Missile {
	/**
	 * @override
	 * @param {Unit} target
	 */
	reachedDest(target) {
		console.log('Targetedshot.reachedDest');
		this.owner.attack(target);
		this.destructor();
	}
	doFire() {
		this.fire(this.target, this.options.windupPercent ?? 0);
	}
}


module.exports = Targetedshot;
