import { entities, projectiles, state } from './types';
import { canvas } from './canvas';
import { sliderRadius, sliderSpeed } from './ui';
import { spawnEntity } from './entities';

document.getElementById('btnPreset1')!.onclick = () => {
	entities.length = 0; projectiles.length = 0;
	state.selectedUnit = null;
	const r = +sliderRadius.value;
	const s = +sliderSpeed.value;
	const cx = canvas.width / 2, cy = canvas.height / 2;
	for (let i = 0; i < 5; i++) {
		const u1 = spawnEntity(cx - 200, cy - 80 + i * 40, 1, r, s);
		u1.waypoints = [{ x: cx + 200, y: cy - 80 + i * 40 }];
		u1.destination = u1.waypoints[0];
		const u2 = spawnEntity(cx + 200, cy - 80 + i * 40, 2, r, s);
		u2.waypoints = [{ x: cx - 200, y: cy - 80 + i * 40 }];
		u2.destination = u2.waypoints[0];
	}
};

document.getElementById('btnPreset2')!.onclick = () => {
	entities.length = 0; projectiles.length = 0;
	state.selectedUnit = null;
	const r = +sliderRadius.value;
	const s = +sliderSpeed.value;
	const cx = canvas.width / 2, cy = canvas.height / 2;
	for (let i = 0; i < 8; i++) {
		const angle = (i / 8) * Math.PI * 2;
		const u = spawnEntity(cx + Math.cos(angle) * 250, cy + Math.sin(angle) * 250, i % 2 + 1, r, s);
		u.waypoints = [{ x: cx, y: cy }];
		u.destination = u.waypoints[0];
	}
};

document.getElementById('btnPreset3')!.onclick = () => {
	entities.length = 0; projectiles.length = 0;
	state.selectedUnit = null;
	const r = +sliderRadius.value;
	const s = +sliderSpeed.value;
	const cx = canvas.width / 2, cy = canvas.height / 2;
	for (let i = 0; i < 12; i++) {
		spawnEntity(cx + (Math.random() - 0.5) * 10, cy + (Math.random() - 0.5) * 10, 1, r, s);
	}
};

document.getElementById('btnPreset4')!.onclick = () => {
	entities.length = 0; projectiles.length = 0;
	state.selectedUnit = null;
	const r = +sliderRadius.value;
	const s = +sliderSpeed.value;
	const cx = canvas.width / 2, cy = canvas.height / 2;
	const spacing = r * 2.5;
	for (let i = 0; i < 6; i++) {
		const u = spawnEntity(cx - 300 - i * spacing, cy, 1, r, s, i >= 3);
		u.waypoints = [{ x: cx + 400, y: cy }];
		u.destination = u.waypoints[0];
	}
	for (let i = 0; i < 6; i++) {
		const u = spawnEntity(cx + 300 + i * spacing, cy, 2, r, s, i >= 3);
		u.waypoints = [{ x: cx - 400, y: cy }];
		u.destination = u.waypoints[0];
	}
};

document.getElementById('btnPreset5')!.onclick = () => {
	entities.length = 0; projectiles.length = 0;
	state.selectedUnit = null;
	const r = +sliderRadius.value;
	const s = +sliderSpeed.value;
	const cx = canvas.width / 2, cy = canvas.height / 2;
	const spacing = r * 2.5;
	// Team 1: 3 melee in front, 3 range behind
	for (let i = 0; i < 3; i++) {
		const m = spawnEntity(cx - 300 - i * spacing, cy, 1, r, s, false);
		m.waypoints = [{ x: cx + 400, y: cy }];
		m.destination = m.waypoints[0];
	}
	for (let i = 0; i < 3; i++) {
		const rng = spawnEntity(cx - 300 - (3 + i) * spacing, cy, 1, r, s, true);
		rng.waypoints = [{ x: cx + 400, y: cy }];
		rng.destination = rng.waypoints[0];
	}
	// Team 2: mirror
	for (let i = 0; i < 3; i++) {
		const m = spawnEntity(cx + 300 + i * spacing, cy, 2, r, s, false);
		m.waypoints = [{ x: cx - 400, y: cy }];
		m.destination = m.waypoints[0];
	}
	for (let i = 0; i < 3; i++) {
		const rng = spawnEntity(cx + 300 + (3 + i) * spacing, cy, 2, r, s, true);
		rng.waypoints = [{ x: cx - 400, y: cy }];
		rng.destination = rng.waypoints[0];
	}
};

document.getElementById('btnPreset6')!.onclick = () => {
	entities.length = 0; projectiles.length = 0;
	state.selectedUnit = null;
	const r = +sliderRadius.value;
	const s = +sliderSpeed.value;
	const cx = canvas.width / 2, cy = canvas.height / 2;
	// Two static obstacles close together
	const o1 = spawnEntity(cx, cy - 40, 0, r * 1.5, 0);
	o1.ignoreCollision = false;
	const o2 = spawnEntity(cx, cy + 40, 0, r * 1.5, 0);
	o2.ignoreCollision = false;
	// Unit on left, will be sent right-click to the right side
	const u = spawnEntity(cx - 250, cy, 1, r, s);
	u.waypoints = [{ x: cx + 250, y: cy }];
	u.destination = u.waypoints[0];
};

document.getElementById('btnPreset7')!.onclick = () => {
	entities.length = 0; projectiles.length = 0;
	state.selectedUnit = null;
	const r = +sliderRadius.value;
	const s = +sliderSpeed.value;
	const W = canvas.width, H = canvas.height;
	const pad = 80;
	// 50 random static obstacles
	const placed: { x: number; y: number }[] = [];
	for (let i = 0; i < 50; i++) {
		for (let attempt = 0; attempt < 100; attempt++) {
			const ox = pad + Math.random() * (W - pad * 2);
			const oy = pad + Math.random() * (H - pad * 2);
			let ok = true;
			for (const p of placed) {
				const dx = ox - p.x, dy = oy - p.y;
				if (dx * dx + dy * dy < (r * 2.2) * (r * 2.2)) { ok = false; break; }
			}
			if (ok) {
				spawnEntity(ox, oy, 1, r, 0);
				placed.push({ x: ox, y: oy });
				break;
			}
		}
	}
	// One unit on the left, target on the right
	const u = spawnEntity(pad / 2, H / 2, 2, r, s);
	u.waypoints = [{ x: W - pad / 2, y: H / 2 }];
	u.destination = u.waypoints[0];
};
