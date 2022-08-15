
const { EventEmitter } = require('node:events');
const { Vector2 } = require("three");
const Filters = require('./Filters');


/**
 * This is the basic game object of the game
 * can be extended to units or missiles or anything else that needs to be able to take actions
 * this class should contain only the most basic values
 */
module.exports = class GameObject extends EventEmitter {

	netId = 0;
	collisionRadius = 1;

	_position = new Vector2(0, 0);
	set position(pos){
		this._position = new Vector2(pos.x, pos.y);
	}
	get position(){
		return this._position;
	}

	_spawnPosition = new Vector2(0, 0);
	set spawnPosition(spawnPos){
		this._spawnPosition = new Vector2(spawnPos.x || 0, spawnPos.y || 0);
	}
	get spawnPosition(){
		return this._spawnPosition;
	}

	get type(){
		return this.constructor.name;
	}


	/**
	 * 
	 * @param {Object} options
	 * @param {Number} options.netId optional
	 * @param {Vector2} options.spawnPosition or options.position
	 */
	constructor(...args){
		super(...args);

		this.netId = args[0].netId || ++global.lastNetId;

		this.spawnPosition = args[0].spawnPosition || args[0].position;
		this.position = this.spawnPosition;

	}

	_Filters = {};
	Filters(distanceCalcPoint = 'CENTER_TO_CENTER'){
		if(!this._Filters[distanceCalcPoint])
			this._Filters[distanceCalcPoint] = new (Filters(distanceCalcPoint))(this);

		return this._Filters[distanceCalcPoint];
	}
	
	/**
	 * Get distance from this unit to target unit
	 * @param {Unit|IMovable|Vector2} target 
	 * @returns {Number}
	 */
	distanceTo(target){
		return this.position.distanceTo(target.position || target);
	}

	/**
	 * for compatibility
	 * @abstract
	 */
	moveWithCallback(target, reachDestinationCallback, range = 0){

	}
};
