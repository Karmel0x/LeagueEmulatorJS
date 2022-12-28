
const { Vector2 } = require('three');
const Pathfinding = require("../../Game/Components/Pathfinding");
const { IStat } = require("./IStat");
const PositionHelper = require("../../Functions/PositionHelper");


//var ACTIONS = {
//    FREE: 0,
//    STUNNED: 1,
//    DASHING: 2,
//    PREATTACKING: 3,
//    ATTACKING: 4,
//};

/**
 * Trait for units that can move
 * @class
 * @param {GameObject} I
 */
module.exports = (I) => class IMovable extends I {
	constructor(options) {
		super(options);

		var stats = options.stats || {};
		this.moveSpeed = this.moveSpeed || new IStat(stats.moveSpeed || 325);

	}

	_waypoints = [];
	waypointsForced = [];
	waypointsHalt = false;
	sentWaypointsType = -1;
	sentWaypoint = new Vector2();
	followUnit = null;

	get waypoints() {
		if (this.waypointsHalt) {
			return [];
		}

		if (this.waypointsForced.length) {
			return this.waypointsForced;
		}

		if (this.followUnit) {
			if (this.distanceTo(this.followUnit) <= (this.followRange || 1))
				this.followUnit = null;
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
		waypoints = waypoints || this.waypoints;

		var waypointsType = this.waypointsForced.length ? 1 : 0;
		var nextWaypoint = waypoints[0] || this.position;

		var shouldSend = false;
		shouldSend = shouldSend || this.sentWaypointsType != waypointsType;
		shouldSend = shouldSend || this.sentWaypoint.distanceTo(nextWaypoint) > 1;

		if (shouldSend) {
			this.sentWaypointsType = waypointsType;
			this.sentWaypoint = nextWaypoint.clone();

			if (waypointsType)
				this.dashAns();
			else
				this.moveAns();
		}

	}

	/**
	 * Set waypoint for movement
	 * @todo repath if needed
	 * @param {Array.<Vector2>} waypoints
	 * @param {Boolean} send - send packet to client
	 */
	setWaypoints(waypoints) {
		this.waypoints = waypoints;
		this.emit('setWaypoints', this.waypoints);
	}

	/**
	 * Teleport to position (..)
	 * @param {Vector2} position
	 * @param {Boolean} send - send packet to client
	 */
	teleport(position, send = true) {
		this.position.copy(position);

		if (send)
			this.moveAns(true);
	}

	dashAns() {
		var WaypointGroupWithSpeed = global.Network.createPacket('WaypointGroupWithSpeed');
		WaypointGroupWithSpeed.syncId = performance.now();

		WaypointGroupWithSpeed.netId = 0;
		WaypointGroupWithSpeed.teleportNetId = this.netId;

		WaypointGroupWithSpeed.waypoints = [this.position, ...this.waypointsForced.slice(0, 2)];
		WaypointGroupWithSpeed.speedParams = this.speedParams;

		this.sendTo_vision(WaypointGroupWithSpeed);
		//console.log(WaypointGroupWithSpeed);
	}

	/**
	 * Dash to position, but you should use dashTo probably
	 * @param {Vector2} position
	 * @param {Object} options
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

		this.callbacks.move.dash = {
			options: {
				range: 1,
			},
			function: () => {
				//this.ACTION = ACTIONS.FREE;
				delete this.callbacks.move.dash;
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
		var pos = PositionHelper.getPositionBetweenRange(this, position, { maximum: options.range, minimum: options.minRange || options.range });
		this.dash(pos, options);
	}

	/**
	 * Knock unit aside (closer to us)
	 * @todo calculate options for easier usage
	 * @param {Vector2} position 
	 * @param {Number} distance 
	 * @param {Number} minDistance 
	 * @param {Object} options {speed, duration}
	 */
	knockAside(position, distance = 100, minDistance = null, options = {}) {
		minDistance = minDistance ?? distance;
		options.speed = options.speed || (Math.abs(distance) / (options.duration || 1));
		options.parabolicGravity = options.parabolicGravity || 0;
		options.facing = options.facing ?? 1;

		var pos = PositionHelper.getPositionBetweenRange(this, position, { maximum: distance, minimum: minDistance });
		this.dash(pos, options);
	}

	/**
	 * Knock unit back (further to us)
	 * @param {Vector2} position 
	 * @param {Number} distance 
	 * @param {Number} minDistance 
	 * @param {Object} options {speed, duration}
	 */
	knockBack(position, distance = 100, minDistance = null, options = {}) {
		this.knockAside(position, -distance, -minDistance, options);
	}

	/**
	 * Knock unit up
	 * @todo calculate options for easier usage
	 * @param {Object} options {speed, duration}
	 */
	knockUp(options = {}) {
		options.speed = options.speed || (10 / (options.duration || 1));
		options.parabolicGravity = options.parabolicGravity || 16.5;
		options.facing = options.facing ?? 1;

		var position = this.Filters().getRandomPositionClamped(10);
		this.dash(position, options);
	}

	move1(position) {
		this.setWaypoints([position]);
	}

	sendDebugData(trace, movementData) {
		//if(!this.chatBoxMessage)
		return;

		var message = trace + ' ' + performance.now();

		let dist = this.waypoints[0].distanceTo(movementData.waypoints[0]);
		let dist2 = this.waypoints[1] ? this.waypoints[0].distanceTo(this.waypoints[1]) : '';
		let dist3 = this.waypoints[1] ? movementData.waypoints[0].distanceTo(this.waypoints[1]) : '';

		message += "\n";
		message += dist + ' / ' + dist2 + ' / ' + dist3;

		message += "\n";
		message += JSON.stringify(this.waypoints);

		message += "\n";
		message += JSON.stringify(movementData.waypoints);

		this.chatBoxMessage(message);
	}

	move0(packet) {

		var movementData = packet.movementData;
		this.sendDebugData('move0', movementData);
		//if(this.ACTION != ACTIONS.DASHING)
		//    this.moveCallback = null;
		if (this.callbacks.move.pending)
			delete this.callbacks.move.pending;

		var newWaipoints = movementData.waypoints;
		if (!global.doNotUsePathfinding) {
			// idk if it's even necessary here but MoveData.waypoints are wrong when character is dashing
			newWaipoints = Pathfinding.getPath(this.position, packet.position);
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
			teleportNetId: this.netId,
			//syncId: performance.now(),
		};

		var unitWaypoints = this.waypoints;
		if (unitWaypoints.length) {
			movementData.waypoints = [this.position, ...unitWaypoints];
			if (this.speedParams)
				movementData.speedParams = this.speedParams;
		} else {
			movementData.position = this.position;
			movementData.forward = { x: 0, y: 0 };
		};

		return movementData;
	}

	teleportId = 0;
	getNextTeleportId() {
		return (this.teleportId++ % 255) + 1;
	}

	moveAns(teleport = false) {
		// this should be in Movement_Simulation so we can resend if destination will change (following moveable unit)
		// or following should be made with dash.speedParams.followNetId ?
		var WaypointGroup = global.Network.createPacket('WaypointGroup', 'LOW_PRIORITY');
		WaypointGroup.syncId = performance.now();

		WaypointGroup.netId = 0;
		WaypointGroup.teleportNetId = this.netId;

		WaypointGroup.teleportId = teleport ? this.getNextTeleportId() : 0;
		WaypointGroup.waypoints = this.waypointsHalt ? [this.position] : [this.position, ...this._waypoints.slice(0, 2)];

		this.sendTo_vision(WaypointGroup);
		//console.log('WaypointGroup', WaypointGroup);
		//console.log('WaypointGroup.waypoints', WaypointGroup.waypoints);
		//console.trace();
	}


	/**
	 * @todo remove cancelSpell, make clearing reachDestination for this type of actions ?
	 * @param {Vector2|GameObject} target|target.position
	 * @param {Function} reachDestinationCallback 
	 * @param {Number} range 
	 */
	moveWithCallback(target, reachDestinationCallback, range = 0) {
		var movePosition = PositionHelper.getPositionToTargetMinusRange(this, target, Math.max(range - 0.1, 0));
		this.move1(movePosition);
		this.once('reachDestination', reachDestinationCallback);
		this.once('cancelSpell', () => this.removeListener('reachDestination', reachDestinationCallback));
	}

	stopFollowing() {
		this.followUnit = null;
	}

	inRangeOrFollow(range, target, reachDestinationCallback) {
		var rangeSum = range + this.collisionRadius + target.collisionRadius;
		if (this.distanceTo(target) > rangeSum) {

			this.followUnit = target;
			this.once('reachDestination', reachDestinationCallback);
			this.once('cancelSpell', () => {
				this.stopFollowing();
				this.removeListener('reachDestination', reachDestinationCallback);
			});

			return false;
		}

		return true;
	}
};
