import type { Vector2Like } from "./vector2";

// algebraic tangents + bitangent corridor nodes + lazy A*

type Obstacle = {
	position: Vector2Like;
	collisionRadius: number;
};

const MARGIN = 10;
const EDGE_EPSILON = 0.5;
const ARC_SAMPLES = 8;
const ARC_STEP = (2 * Math.PI) / ARC_SAMPLES;
const ARC_COS_HALF_STEP = Math.cos(ARC_STEP / 2);
const ARC_COS = new Float64Array(ARC_SAMPLES);
const ARC_SIN = new Float64Array(ARC_SAMPLES);
for (let s = 0; s < ARC_SAMPLES; s++) {
	ARC_COS[s] = Math.cos(s * ARC_STEP);
	ARC_SIN[s] = Math.sin(s * ARC_STEP);
}
const CORRIDOR_MARGIN = 500;
const BITANGENT_GAP = 200;

function ptSegDistSq(px: number, py: number, ax: number, ay: number, bx: number, by: number): number {
	const abx = bx - ax, aby = by - ay;
	const ab2 = abx * abx + aby * aby;
	if (ab2 === 0) { const dx = px - ax, dy = py - ay; return dx * dx + dy * dy; }
	const t = Math.max(0, Math.min(1, ((px - ax) * abx + (py - ay) * aby) / ab2));
	const cx = ax + t * abx - px, cy = ay + t * aby - py;
	return cx * cx + cy * cy;
}

function addTangentNodes(
	px: number, py: number,
	cx: number, cy: number, r: number,
	nX: Float64Array, nY: Float64Array, nObs: Int32Array,
	n: number, obsIdx: number,
): number {
	const dx = cx - px, dy = cy - py;
	const d2 = dx * dx + dy * dy;
	if (d2 <= r * r) return n;

	const d = Math.sqrt(d2);
	const ux = dx / d, uy = dy / d;
	const perpx = -uy, perpy = ux;

	const dr2 = d2 - r * r;
	const h = dr2 / d;
	const k = r * Math.sqrt(dr2) / d;
	const R = r + MARGIN;

	let tox = px + ux * h + perpx * k - cx;
	let toy = py + uy * h + perpy * k - cy;
	let len = Math.sqrt(tox * tox + toy * toy);
	nX[n] = cx + R * tox / len;
	nY[n] = cy + R * toy / len;
	nObs[n++] = obsIdx;

	tox = px + ux * h - perpx * k - cx;
	toy = py + uy * h - perpy * k - cy;
	len = Math.sqrt(tox * tox + toy * toy);
	nX[n] = cx + R * tox / len;
	nY[n] = cy + R * toy / len;
	nObs[n++] = obsIdx;

	return n;
}

function addBitangentNodes(
	cx1: number, cy1: number, r1: number, obsIdx1: number,
	cx2: number, cy2: number, r2: number, obsIdx2: number,
	nX: Float64Array, nY: Float64Array, nObs: Int32Array,
	n: number,
): number {
	const dx = cx2 - cx1, dy = cy2 - cy1;
	const D2 = dx * dx + dy * dy;
	if (D2 < 0.001) return n;
	const D = Math.sqrt(D2);

	if (D > r1 + r2 + MARGIN * 4 + BITANGENT_GAP) return n;
	if (D <= r1 + r2 + 0.1) return n;

	const gap = D - r1 - r2;
	let pairMargin = MARGIN;
	if (gap < MARGIN * 2.1) {
		pairMargin = gap / 2 - 0.05;
	}
	if (pairMargin < 0.1) pairMargin = 0.1;

	const R1 = r1 + pairMargin;
	const R2 = r2 + pairMargin;
	const theta = Math.atan2(dy, dx);

	// Outer tangents
	if (D > Math.abs(R1 - R2)) {
		let ratio = Math.abs(R1 - R2) / D;
		if (ratio > 1) ratio = 1;
		const phi = Math.acos(ratio);
		nX[n] = cx1 + R1 * Math.cos(theta + phi);
		nY[n] = cy1 + R1 * Math.sin(theta + phi);
		nObs[n++] = obsIdx1;
		nX[n] = cx2 + R2 * Math.cos(theta + phi);
		nY[n] = cy2 + R2 * Math.sin(theta + phi);
		nObs[n++] = obsIdx2;
		nX[n] = cx1 + R1 * Math.cos(theta - phi);
		nY[n] = cy1 + R1 * Math.sin(theta - phi);
		nObs[n++] = obsIdx1;
		nX[n] = cx2 + R2 * Math.cos(theta - phi);
		nY[n] = cy2 + R2 * Math.sin(theta - phi);
		nObs[n++] = obsIdx2;
	}

	// Inner tangents
	if (D > R1 + R2) {
		let ratio = (R1 + R2) / D;
		if (ratio > 1) ratio = 1;
		const psi = Math.acos(ratio);
		nX[n] = cx1 + R1 * Math.cos(theta + psi);
		nY[n] = cy1 + R1 * Math.sin(theta + psi);
		nObs[n++] = obsIdx1;
		nX[n] = cx2 + R2 * Math.cos(theta + Math.PI + psi);
		nY[n] = cy2 + R2 * Math.sin(theta + Math.PI + psi);
		nObs[n++] = obsIdx2;
		nX[n] = cx1 + R1 * Math.cos(theta - psi);
		nY[n] = cy1 + R1 * Math.sin(theta - psi);
		nObs[n++] = obsIdx1;
		nX[n] = cx2 + R2 * Math.cos(theta + Math.PI - psi);
		nY[n] = cy2 + R2 * Math.sin(theta + Math.PI - psi);
		nObs[n++] = obsIdx2;
	}

	// Gateway node
	const gateDist = r1 + gap / 2;
	nX[n] = cx1 + (dx / D) * gateDist;
	nY[n] = cy1 + (dy / D) * gateDist;
	nObs[n++] = obsIdx1;

	return n;
}

export function findPathAroundObstacles(
	start: Vector2Like,
	target: Vector2Like,
	unitRadius: number,
	obstacles: Obstacle[],
): Vector2Like[] | null {
	const obsCount = obstacles.length;
	if (obsCount === 0) return [target];

	const acx = new Float64Array(obsCount);
	const acy = new Float64Array(obsCount);
	const ar = new Float64Array(obsCount);
	for (let i = 0; i < obsCount; i++) {
		const o = obstacles[i]!;
		acx[i] = o.position.x;
		acy[i] = o.position.y;
		ar[i] = o.collisionRadius + unitRadius;
	}

	const sx = start.x, sy = start.y;
	let ex = target.x, ey = target.y;

	// If target is inside any obstacle, push it to the nearest point outside all obstacles
	for (let iter = 0; iter < 5; iter++) {
		let worstPen = 0;
		let worstIdx = -1;
		for (let i = 0; i < obsCount; i++) {
			const dx = ex - acx[i]!, dy = ey - acy[i]!;
			const dist = Math.sqrt(dx * dx + dy * dy);
			const pen = ar[i]! - dist;
			if (pen > worstPen) {
				worstPen = pen;
				worstIdx = i;
			}
		}
		if (worstIdx === -1) break;
		const dx = ex - acx[worstIdx]!, dy = ey - acy[worstIdx]!;
		const dist = Math.sqrt(dx * dx + dy * dy);
		const pushDist = ar[worstIdx]! + 1;
		if (dist > 0.001) {
			ex = acx[worstIdx]! + (dx / dist) * pushDist;
			ey = acy[worstIdx]! + (dy / dist) * pushDist;
		} else {
			// target exactly on obstacle center, push toward start
			const dx2 = sx - acx[worstIdx]!, dy2 = sy - acy[worstIdx]!;
			const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
			if (dist2 > 0.001) {
				ex = acx[worstIdx]! + (dx2 / dist2) * pushDist;
				ey = acy[worstIdx]! + (dy2 / dist2) * pushDist;
			} else {
				ex = acx[worstIdx]! + pushDist;
				ey = acy[worstIdx]!;
			}
		}
	}

	const sdx = ex - sx, sdy = ey - sy;
	const sLen2 = sdx * sdx + sdy * sdy;
	if (sLen2 < 0.001) return [{ x: ex, y: ey }];

	// Fast path: direct line clear?
	let directClear = true;
	for (let i = 0; i < obsCount; i++) {
		const fx = sx - acx[i]!, fy = sy - acy[i]!;
		const ri = ar[i]!;
		const b = 2 * (fx * sdx + fy * sdy);
		const c = fx * fx + fy * fy - ri * ri;
		const disc = b * b - 4 * sLen2 * c;
		if (disc < 0) continue;
		const sqd = Math.sqrt(disc);
		const inv = 0.5 / sLen2;
		const t1 = (-b - sqd) * inv;
		const t2 = (-b + sqd) * inv;
		if ((t1 >= 0 && t1 <= 1) || (t2 >= 0 && t2 <= 1) || (t1 < 0 && t2 > 1)) {
			directClear = false;
			break;
		}
	}
	if (directClear) return [{ x: ex, y: ey }];

	// Corridor pre-filter
	let fCount = 0;
	const fcx = new Float64Array(obsCount);
	const fcy = new Float64Array(obsCount);
	const fr = new Float64Array(obsCount);
	for (let i = 0; i < obsCount; i++) {
		const thresh = ar[i]! + CORRIDOR_MARGIN;
		if (ptSegDistSq(acx[i]!, acy[i]!, sx, sy, ex, ey) < thresh * thresh) {
			fcx[fCount] = acx[i]!;
			fcy[fCount] = acy[i]!;
			fr[fCount] = ar[i]!;
			fCount++;
		}
	}
	if (fCount === 0) return [target];

	// Pre-compute AABB bounds for edge validation (avoids repeated subtraction in hot loop)
	const fMinX = new Float64Array(fCount);
	const fMaxX = new Float64Array(fCount);
	const fMinY = new Float64Array(fCount);
	const fMaxY = new Float64Array(fCount);
	const fre = new Float64Array(fCount); // fr - EDGE_EPSILON
	for (let k = 0; k < fCount; k++) {
		const r = fr[k]! - EDGE_EPSILON;
		fre[k] = r;
		fMinX[k] = fcx[k]! - r;
		fMaxX[k] = fcx[k]! + r;
		fMinY[k] = fcy[k]! - r;
		fMaxY[k] = fcy[k]! + r;
	}

	// Build nodes
	const maxBitangentNodes = 9 * ((fCount * (fCount - 1)) >> 1);
	const maxNodes = 2 + fCount * (4 + ARC_SAMPLES) + maxBitangentNodes;
	const nX = new Float64Array(maxNodes);
	const nY = new Float64Array(maxNodes);
	const nObs = new Int32Array(maxNodes).fill(-1);

	nX[0] = sx; nY[0] = sy;
	nX[1] = ex; nY[1] = ey;
	let n = 2;

	for (let i = 0; i < fCount; i++) {
		n = addTangentNodes(sx, sy, fcx[i]!, fcy[i]!, fr[i]!, nX, nY, nObs, n, i);
		n = addTangentNodes(ex, ey, fcx[i]!, fcy[i]!, fr[i]!, nX, nY, nObs, n, i);
	}

	for (let i = 0; i < fCount; i++) {
		const R = (fr[i]! + MARGIN) / ARC_COS_HALF_STEP;
		const cx = fcx[i]!, cy = fcy[i]!;
		for (let s = 0; s < ARC_SAMPLES; s++) {
			nX[n] = cx + R * ARC_COS[s]!;
			nY[n] = cy + R * ARC_SIN[s]!;
			nObs[n] = i;
			n++;
		}
	}

	for (let i = 0; i < fCount; i++) {
		for (let j = i + 1; j < fCount; j++) {
			n = addBitangentNodes(
				fcx[i]!, fcy[i]!, fr[i]!, i,
				fcx[j]!, fcy[j]!, fr[j]!, j,
				nX, nY, nObs, n,
			);
		}
	}

	// Filter nodes inside another obstacle's circle (swap-and-pop)
	for (let i = n - 1; i >= 2; i--) {
		const x = nX[i]!, y = nY[i]!;
		const oi = nObs[i]!;
		let bad = false;
		for (let j = 0; j < fCount; j++) {
			if (j === oi) continue;
			const ddx = x - fcx[j]!, ddy = y - fcy[j]!;
			if (ddx * ddx + ddy * ddy <= fr[j]! * fr[j]! - 0.001) { bad = true; break; }
		}
		if (bad) {
			n--;
			if (i < n) { nX[i] = nX[n]!; nY[i] = nY[n]!; nObs[i] = nObs[n]!; }
		}
	}

	// Group nodes by obstacle (typed-array segments for cache locality)
	const obsNodeCount = new Int32Array(fCount);
	for (let i = 2; i < n; i++) obsNodeCount[nObs[i]!]!++;
	const obsOff = new Int32Array(fCount + 1);
	for (let i = 0; i < fCount; i++) obsOff[i + 1] = obsOff[i]! + obsNodeCount[i]!;
	const obsList = new Int32Array(n - 2);
	const obsCursor = new Int32Array(obsOff);
	for (let i = 2; i < n; i++) {
		const oi = nObs[i]!;
		obsList[obsCursor[oi]!] = i;
		obsCursor[oi]!++;
	}

	// Build per-node candidate lists (temporary JS arrays, flattened to typed arrays before A*)
	const cands: number[][] = new Array<number[]>(n);
	for (let i = 0; i < n; i++) cands[i] = [];

	// start → all, target → all obstacle nodes
	for (let b = 1; b < n; b++) { cands[0]!.push(b); cands[b]!.push(0); }
	for (let b = 2; b < n; b++) { cands[1]!.push(b); cands[b]!.push(1); }

	// Same-obstacle pairs
	for (let g = 0; g < fCount; g++) {
		const gStart = obsOff[g]!, gEnd = obsOff[g + 1]!;
		for (let i = gStart; i < gEnd; i++)
			for (let j = i + 1; j < gEnd; j++) {
				cands[obsList[i]!]!.push(obsList[j]!);
				cands[obsList[j]!]!.push(obsList[i]!);
			}
	}

	// Cross-obstacle (hybrid: full for close, facing for distant)
	for (let oi = 0; oi < fCount; oi++) {
		const giStart = obsOff[oi]!, giEnd = obsOff[oi + 1]!;
		if (giStart === giEnd) continue;
		for (let oj = oi + 1; oj < fCount; oj++) {
			const gjStart = obsOff[oj]!, gjEnd = obsOff[oj + 1]!;
			if (gjStart === gjEnd) continue;

			const ddx = fcx[oj]! - fcx[oi]!, ddy = fcy[oj]! - fcy[oi]!;
			const d2 = ddx * ddx + ddy * ddy;
			const closeThresh = fr[oi]! + fr[oj]! + MARGIN * 4 + BITANGENT_GAP;

			if (d2 <= closeThresh * closeThresh) {
				for (let ai = giStart; ai < giEnd; ai++) {
					const a = obsList[ai]!;
					for (let bi = gjStart; bi < gjEnd; bi++) {
						const b = obsList[bi]!;
						cands[a]!.push(b);
						cands[b]!.push(a);
					}
				}
			} else {
				for (let ai = giStart; ai < giEnd; ai++) {
					const a = obsList[ai]!;
					if ((nX[a]! - fcx[oi]!) * ddx + (nY[a]! - fcy[oi]!) * ddy <= 0) continue;
					for (let bi = gjStart; bi < gjEnd; bi++) {
						const b = obsList[bi]!;
						if ((nX[b]! - fcx[oj]!) * ddx + (nY[b]! - fcy[oj]!) * ddy >= 0) continue;
						cands[a]!.push(b);
						cands[b]!.push(a);
					}
				}
			}
		}
	}

	// Flatten candidate lists into typed arrays for cache-friendly A* traversal
	const candOff = new Int32Array(n + 1);
	for (let i = 0; i < n; i++) candOff[i + 1] = candOff[i]! + cands[i]!.length;
	const candFlat = new Int32Array(candOff[n]!);
	for (let i = 0; i < n; i++) {
		const c = cands[i]!;
		let off = candOff[i]!;
		for (let j = 0; j < c.length; j++) candFlat[off++] = c[j]!;
	}

	// A* with LAZY edge validation (validate only when node is expanded)
	const dist = new Float64Array(n).fill(Infinity);
	const prev = new Int32Array(n).fill(-1);
	const done = new Uint8Array(n);
	dist[0] = 0;

	let heapCap = Math.max(64, n * 2);
	let heapN = new Int32Array(heapCap);
	let heapP = new Float64Array(heapCap);
	let heapSize = 0;

	const hx0 = nX[1]! - nX[0]!, hy0 = nY[1]! - nY[0]!;
	// Push start node
	heapN[0] = 0; heapP[0] = Math.sqrt(hx0 * hx0 + hy0 * hy0);
	heapSize = 1;

	while (heapSize > 0) {
		// Heap pop
		const u: number = heapN[0]!;
		heapSize--;
		if (heapSize > 0) {
			heapN[0] = heapN[heapSize]!;
			heapP[0] = heapP[heapSize]!;
			let i = 0;
			while (true) {
				let s = i;
				const l = 2 * i + 1, ri = 2 * i + 2;
				if (l < heapSize && heapP[l]! < heapP[s]!) s = l;
				if (ri < heapSize && heapP[ri]! < heapP[s]!) s = ri;
				if (s === i) break;
				let tmp = heapN[i]!; heapN[i] = heapN[s]!; heapN[s] = tmp;
				tmp = heapP[i]!; heapP[i] = heapP[s]!; heapP[s] = tmp;
				i = s;
			}
		}

		if (done[u]) continue;
		done[u] = 1;
		if (u === 1) break;

		const ux = nX[u]!, uy = nY[u]!;
		const uDist = dist[u]!;
		const uCandStart: number = candOff[u]!, uCandEnd: number = candOff[u + 1]!;

		for (let e: number = uCandStart; e < uCandEnd; e++) {
			const v = candFlat[e]!;
			if (done[v]) continue; // already settled, skip validation entirely

			const vx = nX[v]!, vy = nY[v]!;
			const edx = vx - ux, edy = vy - uy;
			const d2 = edx * edx + edy * edy;
			if (d2 < 0.001) continue;

			// Inline segment-circle edge validation with precomputed AABB
			const segMinX = ux < vx ? ux : vx;
			const segMaxX = ux > vx ? ux : vx;
			const segMinY = uy < vy ? uy : vy;
			const segMaxY = uy > vy ? uy : vy;

			let blocked = false;
			for (let k = 0; k < fCount; k++) {
				// Pre-computed AABB reject
				if (fMaxX[k]! < segMinX || fMinX[k]! > segMaxX || fMaxY[k]! < segMinY || fMinY[k]! > segMaxY) continue;

				// Quadratic segment-circle intersection (radius - epsilon for margin-boundary robustness)
				const r = fre[k]!;
				const fx = ux - fcx[k]!, fy = uy - fcy[k]!;
				const bb = 2 * (fx * edx + fy * edy);
				const cc = fx * fx + fy * fy - r * r;
				const disc = bb * bb - 4 * d2 * cc;
				if (disc < 0) continue;

				const sqd = Math.sqrt(disc);
				const inv2 = 0.5 / d2;
				const t1 = (-bb - sqd) * inv2;
				const t2 = (-bb + sqd) * inv2;

				if ((t1 >= 0 && t1 <= 1) || (t2 >= 0 && t2 <= 1) || (t1 < 0 && t2 > 1)) {
					blocked = true;
					break;
				}
			}

			if (!blocked) {
				const w = Math.sqrt(d2);
				const alt = uDist + w;
				if (alt < dist[v]!) {
					dist[v] = alt;
					prev[v] = u;
					const hdx = nX[1]! - vx, hdy = nY[1]! - vy;
					const pri = alt + Math.sqrt(hdx * hdx + hdy * hdy);

					// Heap push (inlined)
					if (heapSize === heapCap) {
						heapCap *= 2;
						const nn = new Int32Array(heapCap);
						const np = new Float64Array(heapCap);
						nn.set(heapN); np.set(heapP);
						heapN = nn; heapP = np;
					}
					let i = heapSize++;
					heapN[i] = v; heapP[i] = pri;
					while (i > 0) {
						const parent = (i - 1) >> 1;
						if (heapP[parent]! <= heapP[i]!) break;
						let tmp: number;
						tmp = heapN[i]!; heapN[i] = heapN[parent]!; heapN[parent] = tmp;
						tmp = heapP[i]!; heapP[i] = heapP[parent]!; heapP[parent] = tmp;
						i = parent;
					}
				}
			}
		}
	}

	if (dist[1] === Infinity) return null;

	const path: number[] = [];
	for (let at = 1; at !== -1; at = prev[at]!) path.push(at);
	path.reverse();

	const waypoints: Vector2Like[] = [];
	for (let i = 1; i < path.length; i++) {
		const idx = path[i]!;
		waypoints.push({ x: nX[idx]!, y: nY[idx]! });
	}
	return waypoints.length > 0 ? waypoints : null;
}
