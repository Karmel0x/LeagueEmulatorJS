
import packets from '../../../packets/index.js';
import Moving from './Moving.js';


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
export default class MovingUnit extends Moving {

	owner;
	/**
	 * 
	 * @param {import('../../GameObjects.js').MovableUnit} owner 
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
		const packet1 = new packets.WaypointGroupWithSpeed();
		packet1.syncId = performance.now();

		packet1.netId = 0;
		packet1.teleportNetId = this.owner.netId;

		packet1.waypoints = [this.owner.position, ...this.waypointsForced.slice(0, 2)];
		packet1.speedParams = this.speedParams;

		this.owner.packets.toVision(packet1);
		//console.log(packet1);
	}

	moveAns(teleport = false) {
		// this should be in Movement_Simulation so we can resend if destination will change (following moveable unit)
		// or following should be made with dash.speedParams.followNetId ?
		const packet1 = new packets.WaypointGroup();
		packet1.syncId = performance.now();

		packet1.netId = 0;
		packet1.teleportNetId = this.owner.netId;

		packet1.teleportId = teleport ? this.getNextTeleportId() : 0;
		packet1.waypoints = this.waypointsHalt ? [this.owner.position] : [this.owner.position, ...this._waypoints.slice(0, 2)];

		this.owner.packets.toVision(packet1);
		//console.log('WaypointGroup', packet1);
		//console.log('WaypointGroup.waypoints', packet1.waypoints);
		//console.trace();
	}

}
