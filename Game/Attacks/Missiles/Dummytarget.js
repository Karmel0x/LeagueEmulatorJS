const { Vector2 } = require("three");

class Dummytarget {
	Movement = {
		Waypoints: [
			new Vector2(0, 0)
		]
	};
	get Position(){
		return this.Movement.Waypoints[0];
	}
	constructor(Waypoints){
		this.Movement.Waypoints = Waypoints;
	}
}

module.exports = Dummytarget;
