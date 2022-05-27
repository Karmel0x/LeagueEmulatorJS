
const { EventEmitter } = require('node:events');
const { Vector2 } = require("three");
const PositionHelper = require('../Functions/PositionHelper');


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

	
	/**
	 * Get distance from this unit to target unit
	 * @param {Unit|IMovable} target 
	 * @returns {Number}
	 */
	distanceTo(target){
		return this.position.distanceTo(target.position);
	}
	
	/**
	 * @abstract
	 */
	inRangeOrMove(range, target, reachDestinationCallback){
		var rangeSum = range + this.collisionRadius + target.collisionRadius;
		if(PositionHelper.distanceBetween(this, target) > rangeSum)
			return false;

		return true;
	}
};
