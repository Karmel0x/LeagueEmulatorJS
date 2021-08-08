
const { Vector2 } = require('three');
const Missile = require('./Missile');


class Targetedshot extends Missile {
	reachedDest(target){
		console.log('Targetedshot.reachedDest');
		this.parent.battle.attack(target);
		this.destructor();
	}
}


module.exports = Targetedshot;
