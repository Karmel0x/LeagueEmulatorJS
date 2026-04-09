import { findPathAroundObstacles } from '@repo/geometry';
import type { ExportedCase } from '@repo/geometry/tests/export-cases';
import { canvas, canvasWrap } from './canvas';
import { spawnEntity } from './entities';
import { entities, projectiles, state } from './types';
import { chkPaused } from './ui';

const pathMethods = [findPathAroundObstacles];
let loadedCases: ExportedCase[] = [];
let caseIndex = 0;

export const METHOD_COLORS = ['#ffeb3b', '#00e5ff', '#76ff03', '#ff80ab', '#b388ff', '#ff6e40'];

export type OverlayMethodPath = {
	name: string;
	path: { x: number; y: number }[] | null;
	color: string;
};

export type OverlayObstacle = {
	x: number;
	y: number;
	r: number;
	waypoints?: { x: number; y: number }[];
};

// overlay state drawn on top of everything
export let pathfindingJsonOverlay: {
	obstacles: OverlayObstacle[];
	methods: OverlayMethodPath[];
} | null = null;

export function clearOverlay() {
	pathfindingJsonOverlay = null;
}

const pathfindingJsonNav = document.getElementById('pathfindingJsonNav')!;
const pathfindingJsonInfo = document.getElementById('pathfindingJsonInfo')!;
const fileInput = document.getElementById('fileLoadPathfindingJson') as HTMLInputElement;
const sliderCase = document.getElementById('sliderCase') as HTMLInputElement;
const inputImportScale = document.getElementById('inputImportScale') as HTMLInputElement;

function showCase(index: number) {
	if (loadedCases.length === 0) return;
	caseIndex = Math.max(0, Math.min(index, loadedCases.length - 1));
	sliderCase.value = String(caseIndex);
	const fc = loadedCases[caseIndex];
	const scale = +inputImportScale.value || 1;

	// First obstacle is the pathfinding unit, rest are obstacles for pathfinding methods
	const unit = fc.obstacles[0];
	const restObstacles = fc.obstacles.slice(1);

	// compute bounding box on scaled values
	let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
	for (const o of fc.obstacles) {
		const r = o.collisionRadius * scale;
		minX = Math.min(minX, o.position.x * scale - r);
		maxX = Math.max(maxX, o.position.x * scale + r);
		minY = Math.min(minY, o.position.y * scale - r);
		maxY = Math.max(maxY, o.position.y * scale + r);
		if (o.waypoints) {
			for (const w of o.waypoints) {
				minX = Math.min(minX, w.x * scale); maxX = Math.max(maxX, w.x * scale);
				minY = Math.min(minY, w.y * scale); maxY = Math.max(maxY, w.y * scale);
			}
		}
	}
	if (!isFinite(minX)) { minX = 0; maxX = canvas.width; minY = 0; maxY = canvas.height; }

	const pad = 50;
	const caseW = maxX - minX + pad * 2;
	const caseH = maxY - minY + pad * 2;
	canvas.width = Math.max(caseW, canvasWrap.clientWidth);
	canvas.height = Math.max(caseH, canvasWrap.clientHeight);

	const mapX = (x: number) => x * scale - minX + pad;
	const mapY = (y: number) => y * scale - minY + pad;

	const obstacles: OverlayObstacle[] = fc.obstacles.map(o => ({
		x: mapX(o.position.x),
		y: mapY(o.position.y),
		r: o.collisionRadius * scale,
		...(o.waypoints && o.waypoints.length > 0 && { waypoints: o.waypoints.map(w => ({ x: mapX(w.x), y: mapY(w.y) })) }),
	}));

	// Run pathfinding methods using first obstacle as the unit (on original coordinates)
	const fcStart = unit?.position;
	const fcTarget = unit?.waypoints?.[unit.waypoints.length - 1];
	const fcUnitRadius = unit?.collisionRadius;

	const methods: OverlayMethodPath[] = (fcStart && fcTarget && fcUnitRadius) ? pathMethods.map((method, i) => {
		const path = method(fcStart, fcTarget, fcUnitRadius, restObstacles);
		return {
			name: `M${i + 1}`,
			path: path ? path.map(p => ({ x: mapX(p.x), y: mapY(p.y) })) : null,
			color: METHOD_COLORS[i % METHOD_COLORS.length],
		};
	}) : [];

	const okMethods = methods.filter(m => m.path && m.path.length > 0).map(m => m.name);
	const failMethods = methods.filter(m => !m.path || m.path.length === 0).map(m => m.name);
	const statusParts: string[] = [];
	if (okMethods.length > 0) statusParts.push(`OK: ${okMethods.join(', ')}`);
	if (failMethods.length > 0) statusParts.push(`FAIL: ${failMethods.join(', ')}`);
	pathfindingJsonInfo.textContent = `Case ${caseIndex + 1}/${loadedCases.length} (${fc.obstacles.length} obs) ${statusParts.join(' | ')}`;

	pathfindingJsonOverlay = { obstacles, methods };

	// pause simulation so we can inspect
	chkPaused.checked = true;
	entities.length = 0;
	projectiles.length = 0;
	state.selectedUnit = null;

	// spawn all obstacles as entities
	for (const o of fc.obstacles) {
		const e = spawnEntity(mapX(o.position.x), mapY(o.position.y), 1, o.collisionRadius * scale, o.moveSpeed ? o.moveSpeed * scale : undefined);
		if (o.waypoints && o.waypoints.length > 0) {
			e.waypoints = o.waypoints.map(w => ({ x: mapX(w.x), y: mapY(w.y) }));
			e.destination = e.waypoints[e.waypoints.length - 1];
		}
	}
}

document.getElementById('btnLoadPathfindingJson')!.onclick = () => fileInput.click();
fileInput.onchange = () => {
	const file = fileInput.files?.[0];
	if (!file) return;
	const reader = new FileReader();
	reader.onload = () => {
		loadedCases = JSON.parse(reader.result as string);
		sliderCase.min = '0';
		sliderCase.max = String(loadedCases.length - 1);
		sliderCase.value = '0';
		pathfindingJsonNav.style.display = 'block';
		showCase(0);
	};
	reader.readAsText(file);
	fileInput.value = '';
};
sliderCase.onchange = () => showCase(+sliderCase.value);
document.getElementById('btnPathfindingJsonPrev')!.onclick = () => showCase(caseIndex - 1);
document.getElementById('btnPathfindingJsonNext')!.onclick = () => showCase(caseIndex + 1);
