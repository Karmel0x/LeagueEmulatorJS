
const { Vector2 } = require('three');
const Missile = require('./Missile');


class Skillshot extends Missile {

	collisionCallback_range = 60;
	collisionCallback(target){
		if(this.parent == target)
			return;

		this.parent.battle.attack(target);
		this.collisionCallback = null;
        //this.Waypoints = [this.Waypoints[0]];
		this.destructor();
	}
	static getMaxRangePosition(SourcePosition, TargetPosition, range = 0){
		//if(range == 0)
		//    return TargetPosition;

		var MaxRangePosition = new Vector2(TargetPosition.x, TargetPosition.y);
		MaxRangePosition.sub(SourcePosition);
		MaxRangePosition.normalize().multiplyScalar(range);
		MaxRangePosition.add(SourcePosition);

		return MaxRangePosition;
	}
	static create(source, TargetPosition, options = {}){
		var skillshot = {};
		skillshot.missile = new Skillshot(source, options);
		skillshot.missile.collisionCallback_range = options.radius;
		
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
