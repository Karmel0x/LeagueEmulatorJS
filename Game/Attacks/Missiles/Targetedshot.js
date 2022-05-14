
const { Vector2 } = require('three');
const SpellSlot = require('../../../Constants/SpellSlot');
const Missile = require('./Missile');


class Targetedshot extends Missile {
	/**
	 * 
	 * @param {Unit} source
	 * @param {Unit} target
	 * @param {Object} options
	 * @returns {Targetedshot}
	 */
	static create(source, target, options = {}){
		var missile = new Targetedshot(source, options);
		missile.target = target;

		return missile;
	}
	/**
	 * @override
	 * @param {Unit} target
	 */
	reachedDest(target){
		console.log('Targetedshot.reachedDest');
		this.parent.battle.attack(target);
		this.destructor();
	}
	doFire(){
		this.fire(this.target, this.windupPercent ?? this.owner.character?.spells.spells[SpellSlot.A]?.windupPercent ?? 0);
	}
}


module.exports = Targetedshot;
