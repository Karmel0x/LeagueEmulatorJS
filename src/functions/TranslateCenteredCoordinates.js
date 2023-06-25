const { Vector2 } = require('three');
const NavigationGrid = require('../constants/NavigationGrid.json');
// need to verify NavigationGrid.MiddleOfMap


module.exports = class TranslateCenteredCoordinates {
	/**
	 * Convert CenteredCoordinates to waypoints
	 * @param {Vector2[]} waypointsCC
	 * @returns {Vector2[]}
	 */
	static from(waypointsCC) {
		return waypointsCC.map(waypoint => new Vector2(
			2 * waypoint.x + NavigationGrid.MiddleOfMap.x,
			2 * waypoint.y + NavigationGrid.MiddleOfMap.y,
		));
	}

	/**
	 * Convert waypoints to CenteredCoordinates
	 * @param {Vector2[]} waypoints
	 * @returns {Vector2[]}
	 */
	static to(waypoints) {
		return waypoints.map(waypoint => new Vector2(
			(waypoint.x - NavigationGrid.MiddleOfMap.x) / 2,
			(waypoint.y - NavigationGrid.MiddleOfMap.y) / 2,
		));
	}
};
