const { Vector2 } = require('three');
const NavigationGrid = require('../Constants/NavigationGrid.json');
// need to verify NavigationGrid.MiddleOfMap


module.exports = class TranslateCenteredCoordinates {
	static from(waypointsCC){
		var obj = [];

		for(let waypoint of waypointsCC){
			//obj.push({
			//    x: (2 * waypoint.x + NavigationGrid.MiddleOfMap.x).toFixed(5),
			//    y: (2 * waypoint.y + NavigationGrid.MiddleOfMap.y).toFixed(5),
			//});
			obj.push(new Vector2(
				2 * waypoint.x + NavigationGrid.MiddleOfMap.x,
				2 * waypoint.y + NavigationGrid.MiddleOfMap.y,
			));
		}
		return obj;
	}
	static to(waypoints){
		var obj = [];

		for(let waypoint of waypoints){
			//obj.push({
			//    x: (waypoint.x - NavigationGrid.MiddleOfMap.x) / 2,
			//    y: (waypoint.y - NavigationGrid.MiddleOfMap.y) / 2,
			//});
			obj.push(new Vector2(
				(waypoint.x - NavigationGrid.MiddleOfMap.x) / 2,
				(waypoint.y - NavigationGrid.MiddleOfMap.y) / 2,
			));
		}
		return obj;
	}
};
