import methods from '../src/path-finding';
import { type Vector2Like } from "../src/vector2";
import { type ExportedCase, exportCasesToJson } from './export-cases';

type Obstacle = { position: Vector2Like; collisionRadius: number };

const BOARD_SIZE = 8000;
const UNIT_RADIUS = 80;
const NUM_PATHS = 500;
const OBSTACLE_COUNTS = [10, 50, 100, 250, 500];

function randomPoint(): Vector2Like {
    return {
        x: Math.random() * BOARD_SIZE,
        y: Math.random() * BOARD_SIZE,
    };
}

function collidesWithAny(point: Vector2Like, obstacles: Obstacle[]): boolean {
    for (const o of obstacles) {
        const dx = point.x - o.position.x;
        const dy = point.y - o.position.y;
        const r = UNIT_RADIUS * 2 + o.collisionRadius;
        if (dx * dx + dy * dy < r * r) return true;
    }
    return false;
}

function randomClearPoint(obstacles: Obstacle[]): Vector2Like {
    for (let attempt = 0; attempt < 10000; attempt++) {
        const p = randomPoint();
        if (!collidesWithAny(p, obstacles)) return p;
    }
    throw new Error('Could not find a clear point after 10000 attempts');
}

function generateObstacles(count: number): Obstacle[] {
    const obstacles: Obstacle[] = [];
    for (let i = 0; i < count; i++) {
        const r = 20 + Math.random() * 40;
        for (let attempt = 0; attempt < 200; attempt++) {
            const pos = randomPoint();
            let overlaps = false;
            for (const o of obstacles) {
                const dx = pos.x - o.position.x;
                const dy = pos.y - o.position.y;
                const minDist = r + o.collisionRadius + UNIT_RADIUS * 2;
                if (dx * dx + dy * dy < minDist * minDist) {
                    overlaps = true;
                    break;
                }
            }
            if (!overlaps) {
                obstacles.push({ position: pos, collisionRadius: r });
                break;
            }
        }
    }
    return obstacles;
}

async function run() {
    console.log("=========================================");
    console.log("   Pathfinding Performance Benchmark     ");
    console.log("=========================================\n");

    const allCases: ExportedCase[] = [];

    for (const count of OBSTACLE_COUNTS) {
        console.log(`--- Scenario: ${count} obstacles ---`);
        const obstacles = generateObstacles(count);

        const pathsToTest: { start: Vector2Like, target: Vector2Like }[] = [];
        for (let i = 0; i < NUM_PATHS; i++) {
            pathsToTest.push({ start: randomClearPoint(obstacles), target: randomClearPoint(obstacles) });
        }

        const obstaclesPlain = obstacles.map(o => ({
            position: { x: o.position.x, y: o.position.y },
            collisionRadius: o.collisionRadius,
        }));

        // Dry run to warm up JIT
        for (const method of methods) {
            method(pathsToTest[0]!.start, pathsToTest[0]!.target, UNIT_RADIUS, obstacles);
        }

        // Build cases with all method results
        // First obstacle is the pathfinding unit (start position + waypoints to target)
        const cases: ExportedCase[] = pathsToTest.map(p => ({
            obstacles: [
                { position: p.start, collisionRadius: UNIT_RADIUS, waypoints: [p.target] },
                ...obstaclesPlain,
            ],
            methods: [],
        }));

        for (let mi = 0; mi < methods.length; mi++) {
            const method = methods[mi];
            const name = `Method ${mi + 1}`;
            let successCount = 0;
            const startMs = performance.now();

            for (let i = 0; i < pathsToTest.length; i++) {
                const p = pathsToTest[i];
                const path = method(p.start, p.target, UNIT_RADIUS, obstacles);
                cases[i].methods.push({
                    name,
                    path: path ? path.map(w => ({ x: w.x, y: w.y })) : null,
                });
                if (path && path.length > 0) successCount++;
            }

            const endMs = performance.now();
            const totalMs = endMs - startMs;
            const avgMs = totalMs / NUM_PATHS;

            console.log(`${name.padEnd(10)} | Total: ${totalMs.toFixed(2).padStart(8)}ms | Avg: ${avgMs.toFixed(3).padStart(6)}ms/path | Found: ${successCount}/${NUM_PATHS}`);
        }
        console.log("");
        allCases.push(...cases);
    }

    exportCasesToJson(allCases, import.meta.url);
}

run().catch(console.error);
