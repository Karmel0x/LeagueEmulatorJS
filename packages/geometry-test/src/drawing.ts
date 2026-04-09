import { entities, projectiles, teamColors, state } from './types';
import { canvas, ctx, methodLabelsEl, hiddenMethods } from './canvas';
import { chkShowRadius, chkShowVelocity, chkShowTrails, chkPaused, statsEl } from './ui';
import { updateSelectedPanel } from './ui';
import { entityColor } from './entities';
import { pathfindingJsonOverlay } from './pathfinding-overlay';

const DEBUG_POINT_TTL = 30; // frames
export const debugPoints: { x: number; y: number; color: string; ttl: number }[] = [];

export function draw() {
	updateSelectedPanel();
	if (!pathfindingJsonOverlay) methodLabelsEl.innerHTML = '';

	const W = canvas.width;
	const H = canvas.height;

	ctx.clearRect(0, 0, W, H);

	// Grid
	ctx.strokeStyle = '#1a1a4e';
	ctx.lineWidth = 1;
	for (let x = 0; x < W; x += 50) {
		ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
	}
	for (let y = 0; y < H; y += 50) {
		ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
	}

	const showRadius = chkShowRadius.checked;
	const showVelocity = chkShowVelocity.checked;
	const showTrails = chkShowTrails.checked;

	// Trails
	if (showTrails) {
		for (const e of entities) {
			if (e.trail.length < 2) continue;
			const color = entityColor(e);
			ctx.strokeStyle = color + '40';
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.moveTo(e.trail[0].x, e.trail[0].y);
			for (let i = 1; i < e.trail.length; i++)
				ctx.lineTo(e.trail[i].x, e.trail[i].y);
			ctx.stroke();
		}
	}
	for (const e of entities) {
		if (e.testPoints.length < 1) continue;
		const color = entityColor(e);
		for (let i = 0; i < e.testPoints.length; i++) {
			const testPoint = e.testPoints[i]!;
			ctx.fillStyle = testPoint.color || (color + '60');
			ctx.fillRect(e.testPoints[i].x, e.testPoints[i].y, 2, 2);
		}
	}

	// Attack range + target line
	for (const e of entities) {
		if (!e.target) continue;
		// Line to target
		ctx.beginPath();
		ctx.moveTo(e.position.x, e.position.y);
		ctx.lineTo(e.target.position.x, e.target.position.y);
		ctx.strokeStyle = '#ff6b6b60';
		ctx.lineWidth = 1;
		ctx.stroke();
	}

	// Units
	for (const e of entities) {
		const px = e.position.x, py = e.position.y;
		const color = entityColor(e);
		const bodyR = Math.max(6, e.collisionRadius * 0.4);

		// Collision radius ring
		if (showRadius) {
			ctx.beginPath();
			ctx.arc(px, py, e.collisionRadius, 0, Math.PI * 2);
			ctx.strokeStyle = color + '60';
			ctx.lineWidth = 1;
			ctx.stroke();
		}

		// Body — circle for melee, diamond for range
		if (e.isRange) {
			ctx.beginPath();
			ctx.moveTo(px, py - bodyR);
			ctx.lineTo(px + bodyR, py);
			ctx.lineTo(px, py + bodyR);
			ctx.lineTo(px - bodyR, py);
			ctx.closePath();
			ctx.fillStyle = color;
			ctx.fill();
		} else {
			ctx.beginPath();
			ctx.arc(px, py, bodyR, 0, Math.PI * 2);
			ctx.fillStyle = color;
			ctx.fill();
		}

		// Health bar
		const barW = e.collisionRadius * 1.4;
		const barH = 4;
		const barX = px - barW / 2;
		const barY = py - e.collisionRadius - 10;
		const hpRatio = Math.max(0, e.hp / e.maxHp);
		// Background
		ctx.fillStyle = '#00000080';
		ctx.fillRect(barX, barY, barW, barH);
		// Fill
		const hpColor = hpRatio > 0.5 ? '#4caf50' : hpRatio > 0.25 ? '#ff9800' : '#f44336';
		ctx.fillStyle = hpColor;
		ctx.fillRect(barX, barY, barW * hpRatio, barH);

		// Selection ring
		if (e === state.selectedUnit) {
			ctx.beginPath();
			ctx.arc(px, py, e.collisionRadius + 4, 0, Math.PI * 2);
			ctx.strokeStyle = '#fff';
			ctx.lineWidth = 2;
			ctx.setLineDash([4, 4]);
			ctx.stroke();
			ctx.setLineDash([]);
		}

		// Waypoint path visualization
		if (showVelocity && e.waypoints.length > 0) {
			// draw connected path: unit -> wp0 -> wp1 -> ...
			ctx.beginPath();
			ctx.moveTo(px, py);
			for (const wp of e.waypoints) {
				ctx.lineTo(wp.x, wp.y);
			}
			ctx.strokeStyle = color + '80';
			ctx.lineWidth = 1;
			ctx.setLineDash([3, 3]);
			ctx.stroke();
			ctx.setLineDash([]);

			// draw dots at each waypoint
			for (let wi = 0; wi < e.waypoints.length; wi++) {
				const wp = e.waypoints[wi];
				const isLast = wi === e.waypoints.length - 1;
				ctx.beginPath();
				ctx.arc(wp.x, wp.y, isLast ? 4 : 3, 0, Math.PI * 2);
				ctx.fillStyle = isLast ? color + '80' : color + '50';
				ctx.fill();
			}
		}
	}

	// Projectiles
	for (const p of projectiles) {
		const color = teamColors.moving[p.team] ?? '#fff';
		ctx.beginPath();
		ctx.arc(p.position.x, p.position.y, 3, 0, Math.PI * 2);
		ctx.fillStyle = color;
		ctx.fill();
		ctx.beginPath();
		ctx.arc(p.position.x, p.position.y, 5, 0, Math.PI * 2);
		ctx.strokeStyle = color + '60';
		ctx.lineWidth = 1;
		ctx.stroke();
	}

	// Collision overlaps
	state.collisionCount = 0;
	for (let i = 0; i < entities.length; i++) {
		const a = entities[i];
		if (a.ignoreCollision) continue;
		for (let j = i + 1; j < entities.length; j++) {
			const b = entities[j];
			if (b.ignoreCollision) continue;
			const minDist = a.collisionRadius + b.collisionRadius;
			const dx = a.position.x - b.position.x;
			const dy = a.position.y - b.position.y;
			const d = Math.sqrt(dx * dx + dy * dy);
			if (d < minDist) {
				state.collisionCount++;
				ctx.beginPath();
				ctx.moveTo(a.position.x, a.position.y);
				ctx.lineTo(b.position.x, b.position.y);
				ctx.strokeStyle = '#ff000080';
				ctx.lineWidth = 2;
				ctx.stroke();
			}
		}
	}

	// Pathfinding JSON overlay
	if (pathfindingJsonOverlay) {
		const ov = pathfindingJsonOverlay;
		// obstacles with waypoints
		for (const o of ov.obstacles) {
			// waypoints
			if (o.waypoints && o.waypoints.length > 0) {
				ctx.beginPath();
				ctx.moveTo(o.x, o.y);
				for (const w of o.waypoints) ctx.lineTo(w.x, w.y);
				ctx.strokeStyle = '#ffffff30';
				ctx.lineWidth = 1;
				ctx.setLineDash([4, 4]);
				ctx.stroke();
				ctx.setLineDash([]);

				for (const w of o.waypoints) {
					ctx.beginPath();
					ctx.arc(w.x, w.y, 4, 0, Math.PI * 2);
					ctx.fillStyle = '#f44336';
					ctx.fill();
				}
			}
		}

		// draw each method's path (starting from first obstacle's position)
		const unit = ov.obstacles[0];
		const dashPatterns = [[], [6, 4], [2, 4], [8, 2, 2, 2]];
		for (let mi = 0; mi < ov.methods.length; mi++) {
			const m = ov.methods[mi];
			if (!m.path || hiddenMethods.has(m.name)) continue;
			ctx.beginPath();
			if (unit) ctx.moveTo(unit.x, unit.y);
			for (const p of m.path) ctx.lineTo(p.x, p.y);
			ctx.strokeStyle = m.color;
			ctx.lineWidth = 2;
			ctx.setLineDash(dashPatterns[mi % dashPatterns.length]);
			ctx.stroke();
			ctx.setLineDash([]);
			for (const p of m.path) {
				ctx.beginPath();
				ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
				ctx.fillStyle = m.color;
				ctx.fill();
			}
		}

		// labels -- update style only, avoid resetting innerHTML every frame
		for (const m of ov.methods) {
			const el = methodLabelsEl.querySelector(`[data-method="${m.name}"]`) as HTMLElement | null;
			if (!el) {
				// rebuild labels if DOM is out of sync
				methodLabelsEl.innerHTML = ov.methods.map(m2 => {
					const hasPath = m2.path && m2.path.length > 0;
					const color = hasPath ? m2.color : '#f44336';
					const hidden = hiddenMethods.has(m2.name);
					const opacity = hidden ? '0.3' : '1';
					return `<div data-method="${m2.name}" style="color:${color};opacity:${opacity};cursor:pointer">${m2.name}: ${hasPath ? 'path found' : 'no path'}</div>`;
				}).join('');
				break;
			}
			el.style.opacity = hiddenMethods.has(m.name) ? '0.3' : '1';
		}
	}

	// Debug points (via window.addDebugPoint)
	for (let i = debugPoints.length - 1; i >= 0; i--) {
		const dp = debugPoints[i];
		const alpha = dp.ttl / DEBUG_POINT_TTL;
		ctx.globalAlpha = alpha;
		ctx.beginPath();
		ctx.arc(dp.x, dp.y, 4, 0, Math.PI * 2);
		ctx.fillStyle = dp.color;
		ctx.fill();
		ctx.beginPath();
		ctx.arc(dp.x, dp.y, 6, 0, Math.PI * 2);
		ctx.strokeStyle = dp.color;
		ctx.lineWidth = 1;
		ctx.stroke();
		if (!chkPaused.checked && --dp.ttl <= 0) debugPoints.splice(i, 1);
	}
	ctx.globalAlpha = 1;

	// Stats
	const alive = entities.filter(e => !e.dead);
	const moving = alive.filter(e => e.isMoving).length;
	const fighting = alive.filter(e => e.target).length;
	statsEl.textContent = `Units: ${alive.length} | Moving: ${moving} | Fighting: ${fighting} | Projectiles: ${projectiles.length} | Collisions: ${state.collisionCount}`;
}
