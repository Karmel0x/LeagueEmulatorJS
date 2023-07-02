
const { Vector2 } = require('three');
const Pathfinding = require("../../../game/components/Pathfinding");
const { IStat } = require("./IStat");
const PositionHelper = require("../Measure");
const Server = require('../../../app/Server');


//const ACTIONS = {
//    FREE: 0,
//    STUNNED: 1,
//    DASHING: 2,
//    PREATTACKING: 3,
//    ATTACKING: 4,
//};

/**
 * Trait for units that can move
 */
module.exports = class Moving {
	owner;
	/**
	 * 
	 * @param {import('../../GameObjects').MovableObject} owner 
	 * @param {number} [speed]
	 */
	constructor(owner, speed) {
		this.owner = owner;

		let moveSpeed = owner.stats.moveSpeed || speed;
		this.moveSpeed = new IStat(moveSpeed || 325);
	}

	/** @type {Vector2[]} */
	_waypoints = [];
	/** @type {Vector2[]} */
	waypointsForced = [];
	waypointsHalt = false;
	sentWaypointsType = -1;
	sentWaypoint = new Vector2();
	/** @type {import('../../GameObject') | undefined} */
	followUnit = undefined;
	moveTime = 0;

	get waypoints() {
		if (this.waypointsHalt) {
			return [];
		}

		if (this.waypointsForced.length) {
			return this.waypointsForced;
		}

		if (this.followUnit) {
			if (this.owner.distanceTo(this.followUnit) <= (this.followRange || 1))
				this.followUnit = undefined;
			else
				//@todo do not clone ?
				this._waypoints = [this.followUnit.position.clone()];
		}

		return this._waypoints;
	}
	set waypoints(value) {
		if (!value)
			value = [];

		if (!Array.isArray(value))
			value = [value];

		this._waypoints = value;
	}

	sendWaypoints(waypoints) {

	}

	/**
	 * Set waypoint for movement
	 * @todo repath if needed
	 * @param {Vector2[]} waypoints
	 * @param {boolean} send - send packet to client
	 */
	setWaypoints(waypoints) {
		this.waypoints = waypoints;
		this.owner.emit('setWaypoints', this.waypoints);
	}

	/**
	 * Teleport to position (..)
	 * @param {Vector2} position
	 * @param {boolean} send - send packet to client
	 */
	teleport(position, send = true) {
		this.owner.position.copy(position);

		if (send)
			this.moveAns(true);
	}

	dashAns() {

	}

	/**
	 * Dash to position, but you should use dashTo probably
	 * @param {Vector2} position
	 * @param {Object} options
	 * @param {number} [options.speed]
	 * @param {number} [options.parabolicGravity]
	 * @param {Vector2 | {x: number, y: number}} [options.parabolicStartPoint]
	 * @param {number} [options.facing]
	 * @param {number} [options.followNetId]
	 * @param {number} [options.followDistance]
	 * @param {number} [options.followBackDistance]
	 * @param {number} [options.followTravelTime]
	 */
	dash(position, options) {
		//this.ACTION = ACTIONS.DASHING;

		this.speedParams = {//todo: names? then just Object.assign
			pathSpeedOverride: options.speed || 1000,
			parabolicGravity: options.parabolicGravity || 0,
			parabolicStartPoint: options.parabolicStartPoint || { x: 0, y: 0 },
			facing: options.facing || 0,
			followNetId: options.followNetId || 0,
			followDistance: options.followDistance || 0,
			followBackDistance: options.followBackDistance || 0,
			followTravelTime: options.followTravelTime || 0,
		};

		this.waypointsForced = [position];

		this.owner.callbacks.move.dash = {
			options: {
				range: 1,
			},
			function: () => {
				//this.ACTION = ACTIONS.FREE;
				delete this.owner.callbacks.move.dash;
				this.speedParams = null;

				if (options.callback)
					options.callback();
			}
		};
		//this.dashAns();
	}

	/**
	 * Public function to dash unit to position
	 * @param {Vector2} position 
	 * @param {Object} options {speed, range, minRange, callback}
	 */
	dashTo(position, options) {
		let pos = PositionHelper.getPositionBetweenRange(this.owner, position, { maximum: options.range, minimum: options.minRange || options.range });
		this.dash(pos, options);
	}

	/**
	 * Knock unit aside (closer to us)
	 * @todo calculate options for easier usage
	 * @param {Vector2} position 
	 * @param {number} distance 
	 * @param {number} [minDistance] 
	 * @param {Object} options
	 * @param {number} [options.speed]
	 * @param {number} [options.duration]
	 * @param {number} [options.parabolicGravity]
	 * @param {number} [options.facing]
	 */
	knockAside(position, distance = 100, minDistance = undefined, options = {}) {
		minDistance = minDistance ?? distance;
		options.speed = options.speed || (Math.abs(distance) / (options.duration || 1));
		options.parabolicGravity = options.parabolicGravity || 0;
		options.facing = options.facing ?? 1;

		let pos = PositionHelper.getPositionBetweenRange(this.owner, position, { maximum: distance, minimum: minDistance });
		this.dash(pos, options);
	}

	/**
	 * Knock unit back (further to us)
	 * @param {Vector2} position 
	 * @param {number} distance 
	 * @param {number} [minDistance] 
	 * @param {Object} options {speed, duration}
	 */
	knockBack(position, distance = 100, minDistance = undefined, options = {}) {
		this.knockAside(position, -distance, minDistance && -minDistance, options);
	}

	/**
	 * Knock unit up
	 * @todo calculate options for easier usage
	 * @param {Object} options
	 * @param {number} [options.speed]
	 * @param {number} [options.duration]
	 * @param {number} [options.parabolicGravity]
	 * @param {number} [options.facing]
	 */
	knockUp(options = {}) {
		options.speed = options.speed || (10 / (options.duration || 1));
		options.parabolicGravity = options.parabolicGravity || 16.5;
		options.facing = options.facing ?? 1;

		let position = this.owner.measure.getRandomPositionClamped(10);
		this.dash(position, options);
	}

	/**
	 * 
	 * @param {Vector2} position 
	 */
	move1(position) {
		this.setWaypoints([position]);
	}

	sendDebugData(trace, movementData) {
		//if(!this.owner.packets.chatBoxMessage)
		return;

		let message = trace + ' ' + performance.now();

		let dist = this.waypoints[0].distanceTo(movementData.waypoints[0]);
		let dist2 = this.waypoints[1] ? this.waypoints[0].distanceTo(this.waypoints[1]) : '';
		let dist3 = this.waypoints[1] ? movementData.waypoints[0].distanceTo(this.waypoints[1]) : '';

		message += "\n";
		message += dist + ' / ' + dist2 + ' / ' + dist3;

		message += "\n";
		message += JSON.stringify(this.waypoints);

		message += "\n";
		message += JSON.stringify(movementData.waypoints);

		this.owner.packets.chatBoxMessage(message);
	}

	move0(packet) {

		let movementData = packet.movementData;
		this.sendDebugData('move0', movementData);
		//if(this.ACTION != ACTIONS.DASHING)
		//    this.moveCallback = null;
		if (this.owner.callbacks.move.pending)
			delete this.owner.callbacks.move.pending;

		let newWaipoints = movementData.waypoints;
		if (!Server.doNotUsePathfinding) {
			// idk if it's even necessary here but MoveData.waypoints are wrong when character is dashing
			newWaipoints = Pathfinding.getPath(this.owner.position, packet.position);
			//console.log({waypoints: movementData.waypoints, newWaipoints});
		}

		// first waypoint is current position
		newWaipoints.shift();

		if (newWaipoints && newWaipoints.length) {
			this.setWaypoints(newWaipoints);
		}
	}

	moveClear() {
		this.waypoints = [];
	}

	get movementData() {
		let movementData = {
			teleportNetId: this.owner.netId,
			//syncId: performance.now(),
		};

		let unitWaypoints = this.waypoints;
		if (unitWaypoints.length) {
			movementData.waypoints = [this.owner.position, ...unitWaypoints];
			if (this.speedParams)
				movementData.speedParams = this.speedParams;
		} else {
			movementData.position = this.owner.position;
			movementData.forward = { x: 0, y: 0 };
		};

		return movementData;
	}

	teleportId = 0;
	getNextTeleportId() {
		return (this.teleportId++ % 255) + 1;
	}

	moveAns(teleport = false) {

	}


	/**
	 * @todo remove cancelSpell, make clearing reachDestination for this type of actions ?
	 * @param {Vector2 | import('../../GameObject')} target | target.position
	 * @param {Function} reachDestinationCallback 
	 * @param {number} range 
	 */
	moveWithCallback(target, reachDestinationCallback, range = 0) {
		let movePosition = PositionHelper.getPositionToTargetMinusRange(this.owner, target, Math.max(range - 0.1, 0));
		this.move1(movePosition);
		this.owner.once('reachDestination', reachDestinationCallback);
		this.owner.once('cancelSpell', () => this.owner.removeListener('reachDestination', reachDestinationCallback));
	}

	stopFollowing() {
		this.followUnit = undefined;
	}

	/**
	 * 
	 * @param {number} range 
	 * @param {import('../../GameObject')} target 
	 * @param {Function} reachDestinationCallback 
	 * @returns 
	 */
	inRangeOrFollow(range, target, reachDestinationCallback) {
		let rangeSum = range + this.owner.collisionRadius + target.collisionRadius;
		if (this.owner.distanceTo(target) > rangeSum) {

			this.followUnit = target;
			this.owner.once('reachDestination', reachDestinationCallback);
			this.owner.once('cancelSpell', () => {
				this.stopFollowing();
				this.owner.removeListener('reachDestination', reachDestinationCallback);
			});

			return false;
		}

		return true;
	}
};
