const {createPacket, sendPacket} = require("../../../Core/PacketUtilities");
const { Vector2 } = require('three');

//var ACTIONS = {
//    FREE: 0,
//    STUNNED: 1,
//    DASHING: 2,
//    PREATTACKING: 3,
//    ATTACKING: 4,
//};


class Movement {
	constructor(parent){
		this.parent = parent;
	}

	PositionSyncID = 0;
	Waypoints_ = [];
	set Waypoints(val){
		this.PositionSyncID = performance.now();
		this.Waypoints_ = val;
	}
	get Waypoints(){
		return this.Waypoints_;
	}
	SpeedParams = null;

	setWaypoints(Waypoints, send = true){//todo: repath if needed
		//console.log('setWaypoints', Waypoints, this.Waypoints, this.WaypointsPending);
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
	teleport(position, send = true){
		this.Waypoints = [position];

		if(send)
			this.moveAns(true);
	}
	dashAns(){
		var DASH = createPacket('DASH');

		DASH.netId = 0;
		DASH.TeleportNetID = this.parent.netId;

		DASH.Waypoints = this.Waypoints;
		DASH.SpeedParams = this.SpeedParams;
		
		var isSent = global.Teams.ALL.sendPacket_withVision(DASH);
		//console.log(DASH);
	}
	dash(position, options){
		//this.ACTION = ACTIONS.DASHING;

		this.SpeedParams = {//todo: names? then just Object.assign
			PathSpeedOverride: options.speed || 1000,
			ParabolicGravity: options.ParabolicGravity || 0,
			ParabolicStartPoint: options.ParabolicStartPoint || {x: 0, y: 0},
			Facing: options.Facing || 0,
			FollowNetID: options.FollowNetID || 0,
			FollowDistance: options.FollowDistance || 0,
			FollowBackDistance: options.FollowBackDistance || 0,
			FollowTravelTime: options.FollowTravelTime || 0,
		};

		let Waypoints0 = this.Waypoints[0];
		this.WaypointsPending = this.WaypointsPending || this.Waypoints;
		this.Waypoints = [Waypoints0, position];
		
		this.parent.callbacks.move.dash = {
			options: {
				range: 1,
			},
			function: () => {
				//this.ACTION = ACTIONS.FREE;
				delete this.parent.callbacks.move.dash;
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
	static getPositionBetweenRange(SourcePosition, TargetPosition, range = 0, minRange = 0){

		var PositionBetweenRange = new Vector2(TargetPosition.x, TargetPosition.y);
		PositionBetweenRange.sub(SourcePosition);
		if(PositionBetweenRange.length() == 0)
			PositionBetweenRange.x = 0.001;
		PositionBetweenRange.clampLength(minRange ?? range, range);
		PositionBetweenRange.add(SourcePosition);

		return PositionBetweenRange;
	}
	dashTo(position, options){
		var pos = Movement.getPositionBetweenRange(this.Waypoints[0], position, options.range, options.minRange);
		this.dash(pos, options);
	}
	static getRandomPositionClamped(length = 10){
		var RandomPositionClamped = new Vector2().random();
		RandomPositionClamped.subScalar(0.5).normalize();
		RandomPositionClamped.multiplyScalar(length);

		return RandomPositionClamped;
	}
	// idk, i belive it can be made better
	knockAside(SourcePosition, distance = 100, minDistance = null, options = {}){
		minDistance = minDistance ?? distance;
		options.speed = options.speed || (Math.abs(distance) / (options.duration || 1));
		options.ParabolicGravity = options.ParabolicGravity || 0;
		options.Facing = options.Facing ?? 1;

		var position = Movement.getPositionBetweenRange(this.Waypoints[0], SourcePosition, distance, minDistance);
		this.dash(position, options);
	}
	knockBack(SourcePosition, distance = 100, minDistance = null, options = {}){
		this.knockAside(SourcePosition, -distance, -minDistance, options);
	}
	knockUp(options = {}){
		options.speed = options.speed || (10 / (options.duration || 1));
		options.ParabolicGravity = options.ParabolicGravity || 16.5;
		options.Facing = options.Facing ?? 1;

		var position = Movement.getRandomPositionClamped(10);
		position.add(this.Waypoints[0]);
		this.dash(position, options);
	}
	move1(position){
		this.setWaypoints([this.Waypoints[0], position]);
	}
	sendDebugData(trace, MovementData){
		//if(!this.parent.chatBoxMessage)
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

		this.parent.chatBoxMessage(message);
	}
	move0(MovementData){
		this.sendDebugData('move0', MovementData);
		//if(this.ACTION != ACTIONS.DASHING)
		//    this.moveCallback = null;
		if(this.parent.callbacks.move.pending)
			delete this.parent.callbacks.move.pending;
		
		if(MovementData.Waypoints && MovementData.Waypoints.length){
			this.setWaypoints(MovementData.Waypoints);
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
			TeleportNetID: this.parent.netId,
			//SyncID: performance.now(),
		};

		if(this.Waypoints.length > 1){
			movementData.Waypoints = this.Waypoints;
			if(this.SpeedParams)
				movementData.SpeedParams = this.SpeedParams;
		}else{
			movementData.Position = this.Waypoints[0];
			movementData.Forward = {x: 0, y: 0};
		};

		return movementData;
	}
	TeleportID = 0;
	moveAns(teleport = false){
		// this should be in Movement_Simulation so we can resend if destination will change (following moveable unit)
		// or following should be made with dash.SpeedParams.FollowNetID ?
		var MOVE_ANS = createPacket('MOVE_ANS', 'LOW_PRIORITY');
		MOVE_ANS.SyncID = this.PositionSyncID;

		MOVE_ANS.netId = 0;
		MOVE_ANS.TeleportNetID = this.parent.netId;

		MOVE_ANS.TeleportID = teleport ? ++this.TeleportID : 0;
		MOVE_ANS.Waypoints = this.WaypointsHalt ? [this.Waypoints[0]] : this.Waypoints;
		
		var isSent = global.Teams.ALL.sendPacket_withVision(MOVE_ANS);
		//console.log('MOVE_ANS', MOVE_ANS);
		//console.log('MOVE_ANS.Waypoints', MOVE_ANS.Waypoints);
	}

}


module.exports = Movement;
