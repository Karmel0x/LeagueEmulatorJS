import type { Entity } from './types';
import type { ExportedCase } from '@repo/geometry/tests/export-cases';
import { entities, projectiles, state } from './types';
import { canvas, resizeToWrap } from './canvas';
import { spawnEntity } from './entities';
import { clearOverlay } from './pathfinding-overlay';

function entityAt(x: number, y: number): Entity | undefined {
	for (let i = entities.length - 1; i >= 0; i--) {
		const e = entities[i];
		const dx = e.position.x - x;
		const dy = e.position.y - y;
		if (dx * dx + dy * dy <= e.collisionRadius * e.collisionRadius)
			return e;
	}
	return undefined;
}

canvas.addEventListener('mousedown', (ev) => {
	const x = ev.offsetX, y = ev.offsetY;
	if (ev.button === 0) {
		const hit = entityAt(x, y);
		if (hit) {
			state.selectedUnit = hit;
			state.dragging = hit;
			state.dragOffset = { x: hit.position.x - x, y: hit.position.y - y };
		} else {
			const u = spawnEntity(x, y, state.spawnTeam);
			state.selectedUnit = u;
		}
	}
});

canvas.addEventListener('mousemove', (ev) => {
	if (state.dragging) {
		state.dragging.position.x = ev.offsetX + state.dragOffset.x;
		state.dragging.position.y = ev.offsetY + state.dragOffset.y;
		state.dragging.waypoints = [];
	}
});

canvas.addEventListener('mouseup', () => { state.dragging = null; });

canvas.addEventListener('contextmenu', (ev) => {
	ev.preventDefault();
	if (state.selectedUnit) {
		state.selectedUnit.waypoints = [{ x: ev.offsetX, y: ev.offsetY }];
		state.selectedUnit.destination = { x: ev.offsetX, y: ev.offsetY };
		state.selectedUnit.target = null;
	}
});

canvas.addEventListener('dblclick', (ev) => {
	if (!state.selectedUnit) return;
	const team = state.selectedUnit.team;
	const x = ev.offsetX, y = ev.offsetY;
	for (const e of entities) {
		if (e.team === team) {
			e.waypoints = [{ x, y }];
			e.destination = { x, y };
			e.target = null;
		}
	}
});

window.addEventListener('keydown', (ev) => {
	if (ev.key === 'Delete' || ev.key === 'Backspace') {
		for (let i = entities.length - 1; i >= 0; i--) {
			if (entities[i] === state.selectedUnit) {
				entities.splice(i, 1);
				state.selectedUnit = null;
			}
		}
	}
});

// --- Team buttons ---

document.getElementById('btnTeam1')!.onclick = () => state.spawnTeam = 1;
document.getElementById('btnTeam2')!.onclick = () => state.spawnTeam = 2;
document.getElementById('btnNeutral')!.onclick = () => state.spawnTeam = 0;
document.getElementById('btnClear')!.onclick = () => { entities.length = 0; projectiles.length = 0; state.selectedUnit = null; clearOverlay(); resizeToWrap(); };

document.getElementById('btnExport')!.onclick = () => {
	const selectedUnit = state.selectedUnit;
	if (!selectedUnit) return;
	const entityToObstacle = (e: typeof selectedUnit) => ({
		position: { x: e.position.x, y: e.position.y },
		collisionRadius: e.collisionRadius,
		...(e.waypoints.length > 0 && { waypoints: e.waypoints.map(w => ({ x: w.x, y: w.y })) }),
	});

	// First obstacle is the selected unit, rest are other units
	const exported: ExportedCase[] = [{
		obstacles: [
			entityToObstacle(selectedUnit),
			...entities
				.filter(e => e !== selectedUnit && !e.dead)
				.map(entityToObstacle),
		],
		methods: [],
	}];

	const blob = new Blob([JSON.stringify(exported, null, 2)], { type: 'application/json' });
	const a = document.createElement('a');
	a.href = URL.createObjectURL(blob);
	a.download = 'pathfinding.json';
	a.click();
	URL.revokeObjectURL(a.href);
};
