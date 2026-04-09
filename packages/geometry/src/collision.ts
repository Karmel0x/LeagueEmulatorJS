import type { Movable } from "./movement";
import { Vector2, type Vector2Like } from "./vector2";

export type Collidable = Movable & {
	collisionRadius: number;
	isMoving?: boolean;
	direction: Vector2;
	premovePosition?: Vector2;
};

export function isColliding(position: Vector2Like, radius: number, objects: Collidable[], skip: Vector2Like | undefined = undefined) {
	for (let j = 0, l = objects.length; j < l; j++) {
		const object2 = objects[j]!;
		if (object2.position === position)
			continue;
		if (object2.position === skip)
			continue;

		const dist2 = object2.position.distanceTo(position);
		if (dist2 <= (radius + object2.collisionRadius)) {
			return object2;
		}
	}
}

export function filterInRange(object: Collidable, objects: Collidable[], additionalDistance = 0) {
	const premovePosition = object.premovePosition!;
	const position = object.position;
	const collisionRadius = object.collisionRadius;

	const searchRadius = collisionRadius * 10 + additionalDistance;
	const searchRadius2 = searchRadius * searchRadius;
	const obstacles: Collidable[] = [];

	for (let j = 0; j < objects.length; j++) {
		const o = objects[j]!;
		if (o.position === position)
			continue;

		const odx = o.position.x - premovePosition.x;
		const ody = o.position.y - premovePosition.y;
		if (odx * odx + ody * ody <= searchRadius2)
			obstacles.push(o);
	}

	return obstacles;
}

export function resolveCollision(object: Collidable, objects: Collidable[]) {
	const premovePosition = object.premovePosition;
	if (!premovePosition)
		return;

	const position = object.position;
	const collisionRadius = object.collisionRadius;

	// distance how much object moved this game loop iteration
	const distance = position.distanceTo(premovePosition);
	const obstacles = filterInRange(object, objects, distance * 3);

	//const collisionObject1 = isColliding(premovePosition, collisionRadius, obstacles);
	//if (collisionObject1)
	//	return;

	const collisionObject = isColliding(position, collisionRadius, obstacles);
	if (!collisionObject)
		return;

	const aftermovePosition = position.clone();
	position.copy(premovePosition);

	const waypoints = object.waypoints;
	const nextWaypoint = waypoints[0];
	const target = nextWaypoint ? Vector2.from(nextWaypoint) : aftermovePosition;

	// find tangent points from premovePosition to the expanded collision circle
	// tangent line never crosses the circle, so the candidate is guaranteed to not pass through the obstacle
	const expandedRadius = collisionRadius + collisionObject.collisionRadius;
	const toObstacle = collisionObject.position.clone().sub(premovePosition);
	const d = toObstacle.length();

	if (d <= expandedRadius)
		return; // premovePosition already inside collision zone, skip

	const u = toObstacle.clone().divideScalar(d);
	const perp = u.clone().orthogonalize();

	// tangent point offsets along u and perp axes
	const h = (d * d - expandedRadius * expandedRadius) / d;
	const k = expandedRadius * Math.sqrt(d * d - expandedRadius * expandedRadius) / d;

	// two tangent points on the expanded collision circle
	const um = u.clone().multiplyScalar(h);
	const pm = perp.clone().multiplyScalar(k);
	const tangent1 = premovePosition.clone().add(um).add(pm);
	const tangent2 = premovePosition.clone().add(um).sub(pm);

	// pick the tangent point closer to target
	const dist1 = tangent1.distanceTo(target);
	const dist2 = tangent2.distanceTo(target);

	let avoidancePoint: Vector2;
	if (Math.abs(dist1 - dist2) < 0.01) {
		// head-on: prefer right side, fall back to left if right is blocked
		const test = premovePosition.clone().add(perp.clone().multiplyScalar(collisionRadius * 2));
		avoidancePoint = isColliding(test, collisionRadius, obstacles, position) ? tangent2 : tangent1;
	} else {
		avoidancePoint = dist1 < dist2 ? tangent1 : tangent2;
	}

	// move from premovePosition toward the avoidance point
	const avoidanceDir = avoidancePoint.clone().sub(premovePosition).forceNormalize();
	const candidate = premovePosition.clone().add(avoidanceDir.multiplyScalar(distance));

	// check if the candidate collides with other objects
	const candidateCollisionObject = isColliding(candidate, collisionRadius, obstacles, position);
	if (!candidateCollisionObject) {
		position.copy(candidate);

		// update facing direction based on actual movement
		const movement = position.clone().sub(premovePosition);
		if (movement.length() > 0.001) {
			object.direction?.copy(movement.normalize());
		}
		return false;
	}
	//else if (!collisionObject.isMoving && !candidateCollisionObject.isMoving) {
	return true;
	//}
}

export function resolveCollisions(objects: Collidable[]) {
	for (let i = 0, l = objects.length; i < l; i++) {
		const object = objects[i]!;
		if (!object.isMoving)
			continue;

		resolveCollision(object, objects);
	}
}
