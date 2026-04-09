import { writeFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { type Vector2Like } from "../src/vector2";

export type MethodResult = {
    name: string;
    path: Vector2Like[] | null;
};

export type ExportedObstacle = {
    position: Vector2Like;
    collisionRadius: number;
    moveSpeed?: number;
    waypoints?: Vector2Like[];
};

export type ExportedCase = {
    obstacles: ExportedObstacle[];
    methods: MethodResult[];
};

export function exportCasesToJson(cases: ExportedCase[], importMetaUrl: string) {
    const __dirname = dirname(fileURLToPath(importMetaUrl));
    const outPath = resolve(__dirname, 'pathfinding.json');
    writeFileSync(outPath, JSON.stringify(cases, null, 2));
    console.log(`Exported ${cases.length} cases to ${outPath}`);
}
