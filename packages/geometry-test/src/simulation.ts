import { Vector2, resolveCollision, findPathAroundObstacles } from '@repo/geometry';
import { filterInRange, isColliding } from '@repo/geometry/collision';
import { moveObjectToward } from '@repo/geometry/movement';
import { removeDead, updateCombat, updateProjectiles } from './combat';
import { draw } from './drawing';
import { entities, state, type Entity } from './types';
import { chkPaused } from './ui';

const MAX_TRAIL = 200;
const SIM_INTERVAL = 33; // ~30hz, same as gameserver
let lastTime = performance.now();
let wasPaused = false;
let simAccumulator = 0;

export function update(now: number) {
	requestAnimationFrame(update);
	const dt = now - lastTime;
	lastTime = now;

	if (chkPaused.checked) {
		wasPaused = true;
		draw();
		return;
	}

	if (wasPaused) {
		wasPaused = false;
		simAccumulator = 0;
		draw();
		return;
	}

	simAccumulator += Math.min(dt, 100);

	while (simAccumulator >= SIM_INTERVAL) {
		simAccumulator -= SIM_INTERVAL;
		simulate(SIM_INTERVAL);
	}

	draw();
}

function resolveCollisions(objects: Entity[]) {
	for (let i = 0, l = objects.length; i < l; i++) {
		const object = objects[i]!;
		if (!object.isMoving)
			continue;

		const needPathfinding = resolveCollision(object, objects);
		if (!needPathfinding)
			continue;

		const position = object.position;
		const collisionRadius = object.collisionRadius;
		const premovePosition = object.premovePosition;
		const destination = object.destination;
		if (!destination)
			continue;

		const distance = position.distanceTo(premovePosition);
		const obstacles = filterInRange(object, objects, distance * 3);

		const path = findPathAroundObstacles(premovePosition, destination, collisionRadius - 1, obstacles);
		object.waypoints.splice(0);

		if (path && path.length > 0) {
			object.waypoints.push(...path);

			const dir = Vector2.from(path[0]!).sub(premovePosition).normalize();
			if (!dir.isZero()) {
				const pathCandidate = premovePosition.clone().add(dir.multiplyScalar(distance));
				if (!isColliding(pathCandidate, collisionRadius, obstacles, position)) {
					position.copy(pathCandidate);
				}
			}
		}
	}
}

let logTimer = 0;

function simulate(dt: number) {
	const dtSec = dt / 1000;
	logTimer += dt;
	const shouldLog = logTimer >= 1000;
	if (shouldLog) logTimer = 0;

	let t0 = performance.now();

	for (const e of entities) {
		if (e.dead) continue;
		if (e === state.dragging) {
			e.isMoving = true;
			continue;
		}
		if (e.waypoints.length === 0) {
			e.isMoving = false;
			continue;
		}

		const wp = e.waypoints[0];
		const dx = wp.x - e.position.x;
		const dy = wp.y - e.position.y;
		const len = Math.sqrt(dx * dx + dy * dy);
		if (len > 0.001)
			e.direction.copy(new Vector2(dx / len, dy / len));

		e.isMoving = false;
		if (e.waypoints.length) {
			e.premovePosition = e.position.clone();
			moveObjectToward(e, e.speed, dt);
			e.isMoving = true;
		}

		// Record trail
		const trail = e.trail;
		const last = trail[trail.length - 1];
		if (!last || Math.abs(last.x - e.position.x) > 2 || Math.abs(last.y - e.position.y) > 2) {
			trail.push({ x: e.position.x, y: e.position.y });
			if (trail.length > MAX_TRAIL) trail.shift();
		}
	}

	let t1 = performance.now();

	const alive = entities.filter(e => !e.dead);
	resolveCollisions(alive);

	let t2 = performance.now();

	updateCombat(dtSec);
	updateProjectiles(dt);
	removeDead();

	let t3 = performance.now();

	if (shouldLog) {
		const moving = entities.filter(e => e.isMoving).length;
		console.log(`[sim] entities: ${entities.length} (moving: ${moving}) | move: ${(t1 - t0).toFixed(2)}ms | collisions: ${(t2 - t1).toFixed(2)}ms | combat: ${(t3 - t2).toFixed(2)}ms`);
	}
}
