import { Vector2 } from 'three';
import NavigationGrid from '../constants/NavigationGrid.json' assert { type: "json" };
// need to verify NavigationGrid.MiddleOfMap


export default class TranslateCenteredCoordinates {
	/**
	 * Convert CenteredCoordinates to waypoints
	 */
	static from(waypointsCC: Vector2[]) {
		return waypointsCC.map(waypoint => new Vector2(
			2 * waypoint.x + NavigationGrid.MiddleOfMap.x,
			2 * waypoint.y + NavigationGrid.MiddleOfMap.y,
		));
	}

	/**
	 * Convert waypoints to CenteredCoordinates
	 */
	static to(waypoints: Vector2[]) {
		return waypoints.map(waypoint => new Vector2(
			(waypoint.x - NavigationGrid.MiddleOfMap.x) / 2,
			(waypoint.y - NavigationGrid.MiddleOfMap.y) / 2,
		));
	}
}
