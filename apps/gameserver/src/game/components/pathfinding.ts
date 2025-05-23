
import { Vector2, Vector2Like } from '@repo/geometry';
import Navmeshcppjs from '../../../../../packages/navmeshcppjs/index2';
import Server from '../../app/server';
import Pathfinding_ScalarAIMesh from './pathfinding_scalar-ai-mesh';
// @ts-ignore
import Pathfinding_TerrainEscape from './pathfinding_terrain-escape.json' assert { type: "json" };

Navmeshcppjs.initialize();


export default class Pathfinding extends Navmeshcppjs {
	static initialize(inflate = 0) {
		// nothing here atm
	}

	/**
	 * Get closest walkable point to position
	 * @todo better precalculation of terrain escape
	 */
	static terrainEscape(position: Vector2Like) {
		if (!Server.useTerrainEscape)
			return position;

		let pos = Pathfinding_ScalarAIMesh.toAIMesh(position);
		let posEscaped = Pathfinding_TerrainEscape[pos.x]![pos.y] as number[];
		if (!posEscaped)
			return position;

		return Pathfinding_ScalarAIMesh.toCoordinates({ x: posEscaped[0]!, y: posEscaped[1]! });
	}

	/**
	 * Get path from start to end
	 * Performance is ~0.4ms per call on mid-range 2021 laptop cpu
	 * @todo pathfinding look fine but need unwalkable polygons compatible with client (or turning it off?)
	 * atm character is bugging near some blocks
	 */
	static getPath(startPoint: Vector2Like, endPoint: Vector2Like) {
		let startPointEscaped = Pathfinding.terrainEscape(startPoint);
		let endPointEscaped = Pathfinding.terrainEscape(endPoint);

		let path = Navmeshcppjs.getPath(startPointEscaped, endPointEscaped);
		let pathV2 = path = path.map(p => new Vector2(p.x, p.y));
		return pathV2;
	}
}
