const Movement = require('../../Units/Unit/Controllers/Movement');
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
					if(this.parent == target)
						return;
			
					this.parent.battle.attack(target);
					delete this.callbacks.collision._;
					//this.Waypoints = [this.Waypoints[0]];
					this.destructor();
				}
			}
		},
	}

	/**
	 * Get position not farther than range and not closer than range
	 * @param {Vector2} sourcePosition
	 * @param {Vector2} targetPosition
	 * @param {Number} range
	 * @returns {Vector2}
	 */
	static getMaxRangePosition(sourcePosition, targetPosition, range = 0){
		return Movement.getPositionBetweenRange(sourcePosition, targetPosition, range, range);
	//	var MaxRangePosition = new Vector2(targetPosition.x, targetPosition.y);
	//	MaxRangePosition.sub(sourcePosition);
	//	MaxRangePosition.normalize().multiplyScalar(range);
	//	MaxRangePosition.add(sourcePosition);
	//	return MaxRangePosition;
	}
	/**
	 * 
	 * @param {Unit} source - usually owner Unit
	 * @param {Vector2} targetPosition
	 * @param {Object} options
	 * @returns 
	 */
	static create(source, targetPosition, options = {}){
		var missile = new Skillshot(source, options);
		missile.callbacks.collision._.options.range = options.radius;
		
		missile.target = new Dummytarget([
			// idk if `options.range - (options.radius / 2)` is correct here, corners on max range will not hit
			Skillshot.getMaxRangePosition(source.Position, targetPosition, options.range - (options.radius / 2))
		]);
		
		return missile;
	}
	doFire(){
		this.firefire(this.target);
	}
}


module.exports = Skillshot;
