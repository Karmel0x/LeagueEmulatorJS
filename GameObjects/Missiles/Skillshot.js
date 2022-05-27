
const PositionHelper = require('../../Functions/PositionHelper');
const Dummytarget = require('./Dummytarget');
const Missile = require('./Missile');


class Skillshot extends Missile {

	callbacks = {
		move: {},
		collision: {
			// defaultly will end on collision
			_: {
				options: {
					range: 10,
				},
				function: (target) => {
					if(this.owner == target)
						return;
			
					this.owner.attack(target);
					delete this.callbacks.collision._;
					//this.Waypoints = [this.Waypoints[0]];
					this.destructor();
				}
			}
		},
	}

	/**
	 * @todo
	 * @param {Unit} owner
	 * @param {Vector2} targetPosition
	 * @param {Object} options
	 * @returns 
	 */
	static create(owner, targetPosition, options = {}){
		var missile = new Skillshot({owner, position: targetPosition, options});
		missile.callbacks.collision._.options.range = options.radius;
		
		missile.target = new Dummytarget({
			// idk if `options.range - (options.radius / 2)` is correct here, corners on max range will not hit
			position: PositionHelper.getMaxRangePosition(owner.position, targetPosition, options.range - (options.radius / 2))
		});
		
		return missile;
	}
	doFire(){
		this.fire(this.target);
	}
}


module.exports = Skillshot;
