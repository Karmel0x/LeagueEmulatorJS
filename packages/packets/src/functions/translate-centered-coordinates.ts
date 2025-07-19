
import type { Vector2Like } from '@repo/geometry';
import type { Vector2WithZLike } from '@repo/geometry/vector2-with-z';


export default class TranslateCenteredCoordinates {
	// need to verify
	static middleOfMap = {
		x: 6991.434,
		y: 7223.3438
	};

	/**
	 * Convert CenteredCoordinates to waypoints
	 */
	static from(compressedWaypoints: Vector2Like[]): Vector2Like[] {
		compressedWaypoints = compressedWaypoints.filter(w => !!w);
		return compressedWaypoints.map(waypoint => ({
			x: 2 * waypoint.x + this.middleOfMap.x,
			y: 2 * waypoint.y + this.middleOfMap.y,
		}));
	}

	/**
	 * Convert waypoints to CenteredCoordinates
	 */
	static to(waypoints: Vector2Like[]): Vector2Like[] {
		waypoints = waypoints.filter(w => !!w);
		return waypoints.map(waypoint => ({
			x: (waypoint.x - this.middleOfMap.x) / 2,
			y: (waypoint.y - this.middleOfMap.y) / 2,
		}));
	}
}

export class TranslateCenteredCoordinatesV3 {
	// need to verify
	static middleOfMap = {
		x: 6991.434,
		y: 7223.3438,
	};

	/**
	 * Convert CenteredCoordinates to waypoints
	 */
	static from(compressedWaypoints: Vector2Like[] | Vector2WithZLike[]): Vector2WithZLike[] {
		compressedWaypoints = compressedWaypoints.filter(w => !!w);
		return compressedWaypoints.map(waypoint => ({
			x: 2 * waypoint.x + this.middleOfMap.x,
			y: 2 * waypoint.y + this.middleOfMap.y,
			z: (waypoint as Vector2WithZLike).z ?? 60,
		}));
	}

	/**
	 * Convert waypoints to CenteredCoordinates
	 */
	static to(waypoints: Vector2Like[] | Vector2WithZLike[]): Vector2WithZLike[] {
		waypoints = waypoints.filter(w => !!w);
		return waypoints.map(waypoint => ({
			x: (waypoint.x - this.middleOfMap.x) / 2,
			y: (waypoint.y - this.middleOfMap.y) / 2,
			z: (waypoint as Vector2WithZLike).z ?? 60,
		}));
	}
}
