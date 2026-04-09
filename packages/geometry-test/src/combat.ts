import type { Entity } from './types';
import { entities, projectiles, state } from './types';
import { dist } from './entities';

function findTarget(e: Entity): Entity | null {
	let best: Entity | null = null;
	let bestDist = Infinity;
	for (const other of entities) {
		if (other.dead || other.team === e.team || other.team === 0) continue;
		const d = dist(e.position, other.position);
		if (d <= e.attackRange && d < bestDist) {
			bestDist = d;
			best = other;
		}
	}
	return best;
}

export function updateCombat(dt: number) {
	for (const e of entities) {
		if (e.dead || e.team === 0) continue;

		// Aggro: if walking and an enemy is in range, stop to fight
		if (e.waypoints.length > 0 && !e.target) {
			const t = findTarget(e);
			if (t) {
				e.waypoints = [];
				e.target = t;
			}
		}

		// Find or validate target
		if (e.target && (e.target.dead || dist(e.position, e.target.position) > e.attackRange * 1.2)) {
			e.target = null;
		}
		if (!e.target) {
			e.target = findTarget(e);
		}
		if (!e.target) continue;

		// Attack timer
		e.attackTimer -= dt;
		if (e.attackTimer > 0) continue;
		e.attackTimer = e.attackCooldown;

		if (e.isRange) {
			// Spawn projectile
			projectiles.push({
				position: { x: e.position.x, y: e.position.y },
				target: e.target,
				speed: 650 * (e.collisionRadius / 30),
				damage: e.attackDamage,
				team: e.team,
			});
		} else {
			// Melee: instant damage
			e.target.hp -= e.attackDamage;
			if (e.target.hp <= 0) {
				e.target.dead = true;
				e.target = null;
			}
		}
	}
}

export function updateProjectiles(dt: number) {
	for (let i = projectiles.length - 1; i >= 0; i--) {
		const p = projectiles[i];
		if (p.target.dead) {
			projectiles.splice(i, 1);
			continue;
		}
		const d = dist(p.position, p.target.position);
		const step = p.speed * (dt / 1000);
		if (d <= step) {
			// Hit
			p.target.hp -= p.damage;
			if (p.target.hp <= 0) {
				p.target.dead = true;
			}
			projectiles.splice(i, 1);
		} else {
			const dx = p.target.position.x - p.position.x;
			const dy = p.target.position.y - p.position.y;
			p.position.x += (dx / d) * step;
			p.position.y += (dy / d) * step;
		}
	}
}

export function removeDead() {
	for (let i = entities.length - 1; i >= 0; i--) {
		if (entities[i].dead) {
			if (entities[i] === state.selectedUnit) state.selectedUnit = null;
			entities.splice(i, 1);
		}
	}
	// Clear stale targets
	for (const e of entities) {
		if (e.target && e.target.dead) e.target = null;
	}
}
