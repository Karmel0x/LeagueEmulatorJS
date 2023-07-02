
const { Vector2 } = require('three');
const Pathfinding = require("../../../game/components/Pathfinding");
const { IStat } = require("./IStat");
const PositionHelper = require("../Measure");
const Server = require('../../../app/Server');
const Moving = require('./Moving');


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
module.exports = class MovingUnit extends Moving {

	owner;
	/**
	 * 
	 * @param {import('../../GameObjects').MovableUnit} owner 
	 * @param {number} [speed] 
	 */
	constructor(owner, speed) {
		super(owner, speed);
		this.owner = owner;

	}

	/**
	 * @param {Vector2[]} waypoints
	 */
	sendWaypoints(waypoints) {
		waypoints = waypoints || this.waypoints;

		let waypointsType = this.waypointsForced.length ? 1 : 0;
		let nextWaypoint = waypoints[0] || this.owner.position;

		let shouldSend = false;
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

	dashAns() {
		const WaypointGroupWithSpeed = Server.network.createPacket('WaypointGroupWithSpeed');
		WaypointGroupWithSpeed.syncId = performance.now();

		WaypointGroupWithSpeed.netId = 0;
		WaypointGroupWithSpeed.teleportNetId = this.owner.netId;

		WaypointGroupWithSpeed.waypoints = [this.owner.position, ...this.waypointsForced.slice(0, 2)];
		WaypointGroupWithSpeed.speedParams = this.speedParams;

		this.owner.packets.toVision(WaypointGroupWithSpeed);
		//console.log(WaypointGroupWithSpeed);
	}

	moveAns(teleport = false) {
		// this should be in Movement_Simulation so we can resend if destination will change (following moveable unit)
		// or following should be made with dash.speedParams.followNetId ?
		const WaypointGroup = Server.network.createPacket('WaypointGroup', 'LOW_PRIORITY');
		WaypointGroup.syncId = performance.now();

		WaypointGroup.netId = 0;
		WaypointGroup.teleportNetId = this.owner.netId;

		WaypointGroup.teleportId = teleport ? this.getNextTeleportId() : 0;
		WaypointGroup.waypoints = this.waypointsHalt ? [this.owner.position] : [this.owner.position, ...this._waypoints.slice(0, 2)];

		this.owner.packets.toVision(WaypointGroup);
		//console.log('WaypointGroup', WaypointGroup);
		//console.log('WaypointGroup.waypoints', WaypointGroup.waypoints);
		//console.trace();
	}

};
