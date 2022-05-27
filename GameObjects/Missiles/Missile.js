
const { Vector2 } = require('three');

const BaseInterface = require('../../Core/BaseInterface');
const GameObject = require('../GameObject');
const IMovable = require('../Interfaces/IMovable');
const PositionHelper = require("../../Functions/PositionHelper");

//global.baseMissileNetId = 0x60000000;
global.Missiles = global.Missiles || {};
global.MissilesCount = global.MissilesCount || {count: 0};


class Missile extends BaseInterface(GameObject, IMovable) {

	/**
	 * @todo events instead of callbacks?
	 */
	callbacks = {
		move: {},
		collision: {},
	};
	appendGlobal(){

		this.id = global.MissilesCount.count;
		++global.MissilesCount.count;

		global.Missiles[this.netId] = this;
	}
	removeGlobal(){
		
		delete global.Missiles[this.netId];
	}
	initialize(){
		// override
	}

	/**
	 * @param {Object} options
	 * // GameObject
	 * @param {Number} options.netId optional
	 * @param {Vector2} options.spawnPosition or options.position optional
	 * // IMovable
	 * @param {Number} options.stats.moveSpeed or options.speed
	 * // this.constructor
	 * @param {Number} options.stats.attackRange or options.range
	 * @param {Unit} options.owner
	 * @param {Unit} options.target optional
	 */
	constructor(...args){
		args[0].spawnPosition = args[0].spawnPosition || args[0].owner.position;
		args[0].stats = args[0].stats || {};
		args[0].stats.moveSpeed = args[0].stats.moveSpeed || args[0].options.speed;
		args[0].stats.attackRange = args[0].stats.attackRange || args[0].options.range;
		super(...args);

		this.owner = args[0].owner;
		this.options = args[0].options || {};
		this.target = args[0].target || null;
		this.initialize();

		this.appendGlobal();
	}
	destructor(){
		this.removeAllListeners();
		this.removeGlobal();
	}

	/**
	 * @todo move windup somewhere else?
	 */
	async fire(target, windupPercent = 0){
		target = typeof target === 'number' ? global.unitsNetId[target] : target;
		if(!target)
			return console.log('Missile.fire target is not a unit', target);

		console.debug('Missile.fire',
			'this.owner.netId', this.owner.netId, 'this.owner.position', this.owner.position,
			'this.netId', this.netId, 'this.position', this.position,
			'target.netId', target.netId, 'target.position', target.position);

		if(windupPercent){
			// https://leagueoflegends.fandom.com/wiki/Basic_attack#Windup
			let windupP = windupPercent / 100;
			let windupModifier = 1;//?

			let bWindupTime = 1 / this.owner.attackSpeed.baseValue;
			let cAttackTime = 1 / this.owner.attackSpeed.total;
			let windup = bWindupTime + ((cAttackTime * windupP) - bWindupTime) * windupModifier;

			console.debug('windup', windup, this.owner.attackSpeed);
			await global.Utilities.wait(windup * 1000);
		}
		this.fly(target);
	}
	moveTime = 0;

	/**
	 * Called when the missile reaches its destination (hit the target)
	 * @abstract
	 * @param {Unit} target 
	 */
	reachedDest(target){
		// override
		console.log('Missile.reachedDest');
	}
	fulfillRange = 1;
	fly(target){

		if(!this.inRangeOrFollow(this.fulfillRange, target, () => this.reachedDest(target)))
			return false;

		this.reachedDest(target);
	}

	move1(position){
		this.Waypoints = [this.Waypoints[0], position];
	}
}


module.exports = Missile;
