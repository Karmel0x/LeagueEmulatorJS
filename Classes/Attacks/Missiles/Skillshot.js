const MoveableUnit = require('../../Units/MoveableUnit');
const Missile = require('./Missile');


class Skillshot extends Missile {

	callbacks = {
		move: {},
		collision: {
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

	static getMaxRangePosition(SourcePosition, TargetPosition, range = 0){
		return MoveableUnit.getPositionBetweenRange(SourcePosition, TargetPosition, range, range);
	//	var MaxRangePosition = new Vector2(TargetPosition.x, TargetPosition.y);
	//	MaxRangePosition.sub(SourcePosition);
	//	MaxRangePosition.normalize().multiplyScalar(range);
	//	MaxRangePosition.add(SourcePosition);
	//	return MaxRangePosition;
	}
	static create(source, TargetPosition, options = {}){
		var skillshot = {};
		skillshot.missile = new Skillshot(source, options);
		skillshot.missile.callbacks.collision._.options.range = options.radius;
		
		skillshot.target = {
			Waypoints: [
				// idk if `options.range - (options.radius / 2)` is correct here, corners on max range will not hit
				Skillshot.getMaxRangePosition(source.Waypoints[0], TargetPosition, options.range - (options.radius / 2))
			]
		};
		return skillshot;
	}
}


module.exports = Skillshot;
