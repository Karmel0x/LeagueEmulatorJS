
const { Vector2 } = require('three');
const Navmeshcppjs = require('../../../navmeshcppjs');
Navmeshcppjs.initialize(0);

const Pathfinding_ScalarAIMesh = require('./Pathfinding_ScalarAIMesh');
const Pathfinding_TerrainEscape = require('./Pathfinding_TerrainEscape');


class Pathfinding extends Navmeshcppjs {
	static initialize(inflate = 0){
		// nothing here atm
	}
	/**
	 * Get closest walkable point to position
	 * @todo better precalculation of terrain escape
	 * @param {Object|Vector2} position {x, y}
	 * @returns {Object} {x, y}
	 */
	static terrainEscape(position){
		if(!global.useTerrainEscape)
			return position;
		
		var pos = Pathfinding_ScalarAIMesh.toAIMesh(position);
		pos = Pathfinding_TerrainEscape[pos.x][pos.y];
		if(!pos)
			return position;

		return Pathfinding_ScalarAIMesh.toCoordinates({x: pos[0], y: pos[1]});
	}
	/**
	 * Get path from start to end
	 * Performance is ~0.4ms per call on mid-range 2021 laptop cpu
	 * @todo pathfinding look fine but need unwalkable polygons compatible with client (or turning it off?)
	 * atm character is bugging near some blocks
	 * @param {Object|Vector2} startPoint {x, y}
	 * @param {Object|Vector2} endPoint {x, y}
	 * @returns 
	 */
	static getPath(startPoint, endPoint){
		startPoint = Pathfinding.terrainEscape(startPoint);
		endPoint = Pathfinding.terrainEscape(endPoint);

		var path = Navmeshcppjs.getPath(startPoint, endPoint);
		path = path.map(p => new Vector2(p.x, p.y));
		return path;
	}
}

module.exports = Pathfinding;
