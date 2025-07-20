
import { Vector2, type Vector2Like } from '@repo/geometry';
import Navmeshcppjs from '../../../../../packages/navmeshcppjs/index2';
import Server from '../../app/server';
import { NavigationCellFlags } from '../../gameobjectextensions/moving/game-object';
import Pathfinding_ScalarAIMesh from './pathfinding_scalar-ai-mesh';

import TerrainEscape from '@repo/gamedata/maps/map1/scene/terrain-escape.json'; // assert { type: "json" };

Navmeshcppjs.initialize();

// TODO: generate wallOfGrass in terrain-escape.json
type TerrainEscapeCell = [number, number] | NavigationCellFlags.none | NavigationCellFlags.wallOfGrass;

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
			return;

		const pos = Pathfinding_ScalarAIMesh.toAIMesh(position);
		const posEscapedX = TerrainEscape[pos.x];
		if (!posEscapedX)
			return;

		const posEscaped = posEscapedX[pos.y] as TerrainEscapeCell;
		if (!posEscaped || posEscaped === NavigationCellFlags.wallOfGrass)
			return;

		return Pathfinding_ScalarAIMesh.toCoordinates({ x: posEscaped[0], y: posEscaped[1] });
	}

	/**
	 * Get path from start to end
	 * Performance is ~0.4ms per call on mid-range 2021 laptop cpu
	 * @todo pathfinding look fine but need unwalkable polygons compatible with client (or turning it off?)
	 * atm character is bugging near some blocks
	 */
	static getPath(startPoint: Vector2Like, endPoint: Vector2Like) {
		const startPointEscaped = Pathfinding.terrainEscape(startPoint) || startPoint;
		const endPointEscaped = Pathfinding.terrainEscape(endPoint) || endPoint;

		const path = Navmeshcppjs.getPath(startPointEscaped, endPointEscaped);
		const pathV2 = path.map(p => new Vector2(p.x, p.y));
		return pathV2;
	}
}
