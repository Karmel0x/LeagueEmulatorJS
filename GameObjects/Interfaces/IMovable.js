const {createPacket, sendPacket} = require("../../Core/PacketUtilities");
const { Vector2 } = require('three');
const Pathfinding = require("../../Game/Components/Pathfinding");
const IStat = require("./IStat");
const PositionHelper = require("../../Functions/PositionHelper");


//var ACTIONS = {
//    FREE: 0,
//    STUNNED: 1,
//    DASHING: 2,
//    PREATTACKING: 3,
//    ATTACKING: 4,
//};

/**
 * Interface for units that can move.
 * @param {GameObject} I 
 * @returns 
 */
module.exports = (I) => class IMovable extends I {
	constructor(...args){
		super(...args);
		
		var stats = args[0].stats || {};
		this.moveSpeed = this.moveSpeed || new IStat(stats.moveSpeed || 325);

		this.Waypoints = [this.position];
	}

	PositionSyncID = 0;
	_Waypoints = [];
	set Waypoints(val){
		this.PositionSyncID = parseInt(performance.now());
		this._Waypoints = val.map(v => new Vector2(v.x, v.y));
		this.emit('setWaypoints');
	}
	get Waypoints(){
		return this._Waypoints;
	}
	SpeedParams = null;

	/**
	 * @param {Vector2|Object} pos {x, y}
	 */
	set position(pos){
		this.Waypoints = [new Vector2(pos.x, pos.y)];
	}
	get position(){
		return this.Waypoints[0] || new Vector2(this.spawnPosition.x, this.spawnPosition.y);
	}


	/**
	 * Set waypoint for movement, 0 is current position and it will be overwritten
	 * @param {Array.<Vector2>} Waypoints
	 * @param {Boolean} send - send packet to client
	 */
	setWaypoints(Waypoints, send = true){//todo: repath if needed
		console.log('setWaypoints', Waypoints, this.Waypoints, this.WaypointsPending);
		if(this.SpeedParams){
			this.WaypointsPending = Waypoints;
			return;
		}
		var Waypoints0 = this.Waypoints[0];
		this.Waypoints = Waypoints;
		this.Waypoints[0] = Waypoints0;
		if(send)
			this.moveAns();
	}
	/**
	 * Teleport to position (..)
	 * @param {Vector2} position
	 * @param {Boolean} send - send packet to client
	 */
	teleport(position, send = true){
		this.Waypoints = [position];

		if(send)
			this.moveAns(true);
	}
	dashAns(){
		var DASH = createPacket('DASH');

		DASH.netId = 0;
		DASH.TeleportNetId = this.netId;

		DASH.Waypoints = this.Waypoints;
		DASH.SpeedParams = this.SpeedParams;
		
		this.sendTo_vision(DASH);
		//console.log(DASH);
	}
	/**
	 * Dash to position, but you should use dashTo probably
	 * @param {Vector2} position
	 * @param {Object} options
	 */
	dash(position, options){
		//this.ACTION = ACTIONS.DASHING;

		this.SpeedParams = {//todo: names? then just Object.assign
			PathSpeedOverride: options.speed || 1000,
			ParabolicGravity: options.ParabolicGravity || 0,
			ParabolicStartPoint: options.ParabolicStartPoint || {x: 0, y: 0},
			Facing: options.Facing || 0,
			FollowNetId: options.FollowNetId || 0,
			FollowDistance: options.FollowDistance || 0,
			FollowBackDistance: options.FollowBackDistance || 0,
			FollowTravelTime: options.FollowTravelTime || 0,
		};

		let Waypoints0 = this.Waypoints[0];
		this.WaypointsPending = this.WaypointsPending || this.Waypoints;
		this.Waypoints = [Waypoints0, position];
		
		this.callbacks.move.dash = {
			options: {
				range: 1,
			},
			function: () => {
				//this.ACTION = ACTIONS.FREE;
				delete this.callbacks.move.dash;
				this.SpeedParams = null;
				if(this.WaypointsPending && this.WaypointsPending.length > 1)
					this.setWaypoints(this.WaypointsPending);
				this.WaypointsPending = null;
				if(options.callback)
					options.callback();
			}
		};
		this.dashAns();
	}
	
	/**
	 * Public function to dash unit to position
	 * @param {Vector2} position 
	 * @param {Object} options {speed, range, minRange, callback}
	 */
	dashTo(position, options){
		var pos = PositionHelper.getPositionBetweenRange(this.position, position, options.range, options.minRange || options.range);
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
	knockAside(position, distance = 100, minDistance = null, options = {}){
		minDistance = minDistance ?? distance;
		options.speed = options.speed || (Math.abs(distance) / (options.duration || 1));
		options.ParabolicGravity = options.ParabolicGravity || 0;
		options.Facing = options.Facing ?? 1;

		var pos = PositionHelper.getPositionBetweenRange(this.Waypoints[0], position, distance, minDistance);
		this.dash(pos, options);
	}
	/**
	 * Knock unit back (further to us)
	 * @param {Vector2} position 
	 * @param {Number} distance 
	 * @param {Number} minDistance 
	 * @param {Object} options {speed, duration}
	 */
	knockBack(position, distance = 100, minDistance = null, options = {}){
		this.knockAside(position, -distance, -minDistance, options);
	}
	/**
	 * Knock unit up
	 * @todo calculate options for easier usage
	 * @param {Object} options {speed, duration}
	 */
	knockUp(options = {}){
		options.speed = options.speed || (10 / (options.duration || 1));
		options.ParabolicGravity = options.ParabolicGravity || 16.5;
		options.Facing = options.Facing ?? 1;

		var position = PositionHelper.getRandomPositionClamped(10);
		position.add(this.Waypoints[0]);
		this.dash(position, options);
	}
	move1(position){
		this.setWaypoints([this.Waypoints[0], position]);
	}
	sendDebugData(trace, MovementData){
		//if(!this.chatBoxMessage)
			return;

		var message = trace + ' ' + performance.now();

		let dist = this.Waypoints[0].distanceTo(MovementData.Waypoints[0]);
		let dist2 = this.Waypoints[1] ? this.Waypoints[0].distanceTo(this.Waypoints[1]) : '';
		let dist3 = this.Waypoints[1] ? MovementData.Waypoints[0].distanceTo(this.Waypoints[1]) : '';

		message += "\n";
		message += dist + ' / ' + dist2 + ' / ' + dist3;

		message += "\n";
		message += JSON.stringify(this.Waypoints);

		message += "\n";
		message += JSON.stringify(MovementData.Waypoints);

		this.chatBoxMessage(message);
	}
	move0(packet){
		
		var MovementData = packet.MovementData;
		this.sendDebugData('move0', MovementData);
		//if(this.ACTION != ACTIONS.DASHING)
		//    this.moveCallback = null;
		if(this.callbacks.move.pending)
			delete this.callbacks.move.pending;
		
		var newWaipoints = MovementData.Waypoints;
		if(!global.doNotUsePathfinding){
			// idk if it's even necessary here but MoveData.Waypoints are wrong when character is dashing
			newWaipoints = Pathfinding.getPath(this.position, packet.position);
			//console.log({Waypoints: MovementData.Waypoints, newWaipoints});
		}

		if(newWaipoints && newWaipoints.length){
			this.setWaypoints(newWaipoints);
		}
	}
	halt0(send = false, MovementData = {}){
		this.sendDebugData('halt0', MovementData);
		this.moveClear();

		if(send)
			this.moveAns();
	}
	WaypointsHalt = false;
	halt_start(send = false){
		this.WaypointsHalt = true;

		if(send)
			this.moveAns();
	}
	halt_stop(send = true){
		this.WaypointsHalt = false;

		if(send)
			this.moveAns();
	}
	moveClear(){
		this.Waypoints = [this.Waypoints[0]];
	}
	get MovementData(){
		let movementData = {
			TeleportNetId: this.netId,
			//SyncID: performance.now(),
		};

		if(this.Waypoints.length > 1){
			movementData.Waypoints = this.Waypoints;
			if(this.SpeedParams)
				movementData.SpeedParams = this.SpeedParams;
		}else{
			movementData.position = this.position;
			movementData.Forward = {x: 0, y: 0};
		};

		return movementData;
	}
	TeleportID = 0;
	getNextTeleportID(){
		return (this.TeleportID++ % 255) + 1;
	}
	moveAns(teleport = false){
		// this should be in Movement_Simulation so we can resend if destination will change (following moveable unit)
		// or following should be made with dash.SpeedParams.FollowNetId ?
		var MOVE_ANS = createPacket('MOVE_ANS', 'LOW_PRIORITY');
		MOVE_ANS.SyncID = this.PositionSyncID;

		MOVE_ANS.netId = 0;
		MOVE_ANS.TeleportNetId = this.netId;

		MOVE_ANS.TeleportID = teleport ? this.getNextTeleportID() : 0;
		MOVE_ANS.Waypoints = this.WaypointsHalt ? [this.Waypoints[0]] : this.Waypoints;
		
		this.sendTo_vision(MOVE_ANS);
		//console.log('MOVE_ANS', MOVE_ANS);
		//console.log('MOVE_ANS.Waypoints', MOVE_ANS.Waypoints);
		//console.trace();
	}

	/**
	 * Move to range of target
	 * call callback if in range, cancel on cancelSpell
	 * @param {Number} range 
	 * @param {Unit|IMovable} target
	 * @param {Function} reachDestinationCallback 
	 * @returns {Boolean} inRange
	 */
	inRangeOrMove(range, target, reachDestinationCallback){
		var rangeSum = range + this.collisionRadius + target.collisionRadius;
		if(PositionHelper.distanceBetween(this, target) > rangeSum){

			var movePosition = PositionHelper.getPositionToTargetMinusRange(this, target, rangeSum - 0.1);
			this.move1(movePosition);
			this.once('reachDestination', reachDestinationCallback);
			this.once('cancelSpell', () => this.removeListener('reachDestination', reachDestinationCallback));

			return false;
		}
		
		return true;
	}

	stopFollowing(){
		this.followUnit = false;
	}
	inRangeOrFollow(range, target, reachDestinationCallback){
		var rangeSum = range + this.collisionRadius + target.collisionRadius;
		if(PositionHelper.distanceBetween(this, target) > rangeSum){

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
