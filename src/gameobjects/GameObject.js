
const { EventEmitter } = require('node:events');
const { Vector2 } = require("three");
const Filters = require('./Filters');
const UnitList = require('../app/UnitList');


/**
 * @typedef {import('./units/Unit')} Unit
 */

/**
 * This is the basic game object of the game
 * can be extended to units or missiles or anything else that needs to be able to take actions
 * this class should contain only the most basic values
 */
module.exports = class GameObject extends EventEmitter {

	netId = 0;
	collisionRadius = 1;

	position = new Vector2(7000, 7000);
	spawnPosition = new Vector2(7000, 7000);

	get type() {
		return this.constructor.name;
	}

	/**
	 * @param {import('./GameObjects').GameObjectOptions} options 
	 */
	constructor(options) {
		super();

		this.netId = options.netId || ++UnitList.lastNetId;

		this.spawner = options.spawner || options.owner;
		this.spawnPosition = options.spawnPosition || options.position || this.spawner?.position;
		this.position.copy(this.spawnPosition);

	}

	_Filters = {};
	Filters(distanceCalcPoint = 'CENTER_TO_CENTER') {
		if (!this._Filters[distanceCalcPoint])
			this._Filters[distanceCalcPoint] = new (Filters(distanceCalcPoint))(this);

		return this._Filters[distanceCalcPoint];
	}

	/**
	 * Get distance from this unit to target unit
	 * @param {Unit | IMovable | Vector2} target 
	 * @returns {number}
	 */
	distanceTo(target) {
		return this.position.distanceTo(target.position || target);
	}

	/**
	 * for compatibility
	 * @abstract
	 */
	moveWithCallback(target, reachDestinationCallback, range = 0) {

	}
};
