import { Vector2 } from '@repo/geometry';
import type { Entity, Pos2D } from './types';
import { entities, teamColors } from './types';
import { sliderRadius, sliderSpeed } from './ui';

export function dist(a: Pos2D, b: Pos2D) {
	const dx = a.x - b.x, dy = a.y - b.y;
	return Math.sqrt(dx * dx + dy * dy);
}

export function spawnEntity(x: number, y: number, team: number, radius?: number, speed?: number, isRange = false): Entity {
	const r = radius ?? +sliderRadius.value;
	const e: Entity = {
		position: new Vector2(x, y),
		direction: new Vector2(1, 0),
		collisionRadius: r,
		ignoreCollision: team === 0,
		isMoving: false,
		speed: speed ?? +sliderSpeed.value,
		waypoints: [],
		premovePosition: new Vector2(x, y),
		team,
		destination: null,
		trail: [],
		testPoints: [],
		isRange,
		hp: isRange ? 300 : 475,
		maxHp: isRange ? 300 : 475,
		attackRange: isRange ? 550 * (r / 30) : r * 2.5,
		attackDamage: isRange ? 23 : 12,
		attackCooldown: isRange ? 1.0 : 0.8,
		attackTimer: 0,
		target: null,
		dead: false,
	};
	entities.push(e);
	return e;
}

export function entityColor(e: Entity) {
	const key = e.isMoving ? 'moving' : 'idle';
	return teamColors[key][e.team] ?? '#888';
}
