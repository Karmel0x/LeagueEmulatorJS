import methods, { type Collidable } from '../src/collision';
import { Vector2, type Vector2Like } from '../src/vector2';

const BOARD_SIZE = 14000;
const ITERATIONS = 5000;
const WARMUP = 500;

const SCENARIOS = [
	{ name: '10 objects, 5 moving', total: 10, moving: 5 },
	{ name: '50 objects, 20 moving', total: 50, moving: 20 },
	{ name: '100 objects, 40 moving', total: 100, moving: 40 },
	{ name: '200 objects, 80 moving', total: 200, moving: 80 },
	{ name: '50 objects, 50 moving (all)', total: 50, moving: 50 },
];

function randomPos(): Vector2 {
	return new Vector2(Math.random() * BOARD_SIZE, Math.random() * BOARD_SIZE);
}

function generateObjects(total: number, moving: number): Collidable[] {
	const objects: Collidable[] = [];
	for (let i = 0; i < total; i++) {
		const isMoving = i < moving;
		const pos = randomPos();
		const premove = isMoving ? pos.clone().add(new Vector2((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10)) : undefined;
		const waypoints: Vector2Like[] = isMoving ? [randomPos()] : [];

		objects.push({
			position: pos,
			waypoints,
			collisionRadius: 40 + Math.random() * 60,
			ignoreCollision: false,
			isMoving,
			direction: new Vector2(0, 1),
			premovePosition: premove,
		});
	}
	return objects;
}

function cloneObjects(objects: Collidable[]): Collidable[] {
	return objects.map(o => ({
		position: o.position.clone(),
		waypoints: o.waypoints.map(w => ({ x: w.x, y: w.y })),
		collisionRadius: o.collisionRadius,
		ignoreCollision: o.ignoreCollision,
		isMoving: o.isMoving,
		direction: o.direction.clone(),
		premovePosition: o.premovePosition?.clone(),
	}));
}

async function run() {
	console.log('==========================================');
	console.log('   Collision Resolution Perf Benchmark    ');
	console.log('==========================================\n');

	for (const scenario of SCENARIOS) {
		console.log(`--- ${scenario.name} ---`);

		// generate base data set, we'll clone it for each iteration
		const baseSnapshots: Collidable[][] = [];
		for (let i = 0; i < ITERATIONS + WARMUP; i++) {
			baseSnapshots.push(generateObjects(scenario.total, scenario.moving));
		}

		for (let mi = 0; mi < methods.length; mi++) {
			const method = methods[mi];
			const name = `Method ${mi + 1}`;

			// warmup
			for (let i = 0; i < WARMUP; i++) {
				method(cloneObjects(baseSnapshots[i]!));
			}

			// timed run
			const startMs = performance.now();
			for (let i = 0; i < ITERATIONS; i++) {
				method(cloneObjects(baseSnapshots[WARMUP + i]!));
			}
			const endMs = performance.now();

			const totalMs = endMs - startMs;
			const avgUs = (totalMs / ITERATIONS) * 1000;

			console.log(`${name.padEnd(10)} | Total: ${totalMs.toFixed(2).padStart(9)}ms | Avg: ${avgUs.toFixed(2).padStart(8)}us/call`);
		}
		console.log('');
	}

	// correctness check: all methods should produce similar results
	console.log('--- Correctness check ---');
	const checkObjects = generateObjects(50, 25);
	const copies = methods.map((method, i) => {
		const objects = cloneObjects(checkObjects);
		method(objects);
		return { name: `Method ${i + 1}`, objects };
	});

	for (let mi = 1; mi < copies.length; mi++) {
		let maxDiff = 0;
		for (let i = 0; i < copies[0].objects.length; i++) {
			const dx = Math.abs(copies[0].objects[i]!.position.x - copies[mi].objects[i]!.position.x);
			const dy = Math.abs(copies[0].objects[i]!.position.y - copies[mi].objects[i]!.position.y);
			maxDiff = Math.max(maxDiff, dx, dy);
		}
		console.log(`${copies[0].name} vs ${copies[mi].name} | Max diff: ${maxDiff.toFixed(6)} ${maxDiff < 0.01 ? 'PASS' : 'WARN'}`);
	}
}

run().catch(console.error);
