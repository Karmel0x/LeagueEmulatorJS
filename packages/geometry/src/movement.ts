import { Vector2, type Vector2Like } from "./vector2";

export function moveToward(position: Vector2, waypoints: Vector2Like[], distance: number) {
	// use up waypoints until sufficient remainingDistance
	for (let i = 0; i < 10; i++) {
		let nextWaypoint = waypoints[0];
		if (!nextWaypoint)
			break;

		let nextWaypointDistance = position.distanceTo(nextWaypoint);
		if (distance < nextWaypointDistance)
			break;

		position.copy(nextWaypoint);
		distance -= nextWaypointDistance;

		waypoints.shift();
		//object.moving.sentWaypoints = [];
	}

	let nextWaypoint = waypoints[0];
	if (!nextWaypoint) {
		// return left distance for next waypoints type
		return distance;
	}

	// go towards nextWaypoint for remainingDistance
	const direction = Vector2.from(nextWaypoint).sub(position).normalize();
	const vector = direction.multiplyScalar(distance);
	position.add(vector);
	return 0;
}

export function moveTowardFor(position: Vector2, waypoints: Vector2Like[], moveSpeed: number, diff: number) {
	const moveSpeedPerMS = moveSpeed / 1000;
	const distance = moveSpeedPerMS * diff;

	const remainingDistance = moveToward(position, waypoints, distance);
	// return left diff for next waypoints type
	return remainingDistance / moveSpeedPerMS;
}

export type Movable = {
	position: Vector2;
	waypoints: Vector2Like[];
};

export function moveObjectToward(object: Movable, moveSpeed: number, diff: number) {
	const remainingDiff = moveTowardFor(object.position, object.waypoints, moveSpeed, diff);
	return remainingDiff;
}
