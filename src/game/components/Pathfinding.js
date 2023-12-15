
import { Vector2 } from 'three';
import Navmeshcppjs from '../../../../navmeshcppjs/index.js';

import Server from '../../app/Server.js';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

import Pathfinding_ScalarAIMesh from './Pathfinding_ScalarAIMesh.js';
const Pathfinding_TerrainEscape = require('./Pathfinding_TerrainEscape.json');

Navmeshcppjs.initialize(0);


class Pathfinding extends Navmeshcppjs {
	static initialize(inflate = 0) {
		// nothing here atm
	}

	/**
	 * Get closest walkable point to position
	 * @todo better precalculation of terrain escape
	 * @param {Vector2 | {x: number, y: number}} position {x, y}
	 * @returns 
	 */
	static terrainEscape(position) {
		if (!Server.useTerrainEscape)
			return position;

		let pos = Pathfinding_ScalarAIMesh.toAIMesh(position);
		let posEscaped = /** @type {number[]} */ (Pathfinding_TerrainEscape[pos.x][pos.y]);
		if (!posEscaped)
			return position;

		return Pathfinding_ScalarAIMesh.toCoordinates({ x: posEscaped[0], y: posEscaped[1] });
	}

	/**
	 * Get path from start to end
	 * Performance is ~0.4ms per call on mid-range 2021 laptop cpu
	 * @todo pathfinding look fine but need unwalkable polygons compatible with client (or turning it off?)
	 * atm character is bugging near some blocks
	 * @param {Vector2 | {x: number, y: number}} startPoint {x, y}
	 * @param {Vector2 | {x: number, y: number}} endPoint {x, y}
	 * @returns 
	 */
	static getPath(startPoint, endPoint) {
		let startPointEscaped = Pathfinding.terrainEscape(startPoint);
		let endPointEscaped = Pathfinding.terrainEscape(endPoint);

		let path = /** @type {{x: number, y: number}[]} */ (Navmeshcppjs.getPath(startPointEscaped, endPointEscaped));
		let pathV2 = path = path.map(p => new Vector2(p.x, p.y));
		return pathV2;
	}
}

export default Pathfinding;
