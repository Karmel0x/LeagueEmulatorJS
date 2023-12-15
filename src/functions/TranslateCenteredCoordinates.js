import { Vector2 } from 'three';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

const NavigationGrid = require('../constants/NavigationGrid.json');
// need to verify NavigationGrid.MiddleOfMap


class TranslateCenteredCoordinates {
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
}

export default TranslateCenteredCoordinates;
