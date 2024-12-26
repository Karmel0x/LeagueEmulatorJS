
import { Vector2 } from 'three';

export type Vector2Like = Vector2 | { x: number, y: number };


export default class TranslateCenteredCoordinates {
	// need to verify
	static middleOfMap = {
		x: 6991.434,
		y: 7223.3438
	};

	/**
	 * Convert CenteredCoordinates to waypoints
	 */
	static from(compressedWaypoints: Vector2Like[]) {
		return compressedWaypoints.map(waypoint => new Vector2(
			2 * waypoint.x + this.middleOfMap.x,
			2 * waypoint.y + this.middleOfMap.y,
		));
	}

	/**
	 * Convert waypoints to CenteredCoordinates
	 */
	static to(waypoints: Vector2Like[]) {
		return waypoints.map(waypoint => new Vector2(
			(waypoint.x - this.middleOfMap.x) / 2,
			(waypoint.y - this.middleOfMap.y) / 2,
		));
	}
}
