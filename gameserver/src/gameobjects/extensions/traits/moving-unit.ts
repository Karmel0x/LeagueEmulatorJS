
import { Vector2 } from 'three';
import * as packets from '@workspace/packets/packages/packets';
import MovingObject, { MovingEvents } from './moving-object';
import TypedEventEmitter from 'typed-emitter';
import Unit, { UnitEvents } from '../../units/unit';

export type MovingUnitEvents = MovingEvents & UnitEvents & {

};

export interface IMovingUnit extends Unit {
	eventEmitter: TypedEventEmitter<MovingUnitEvents>;
	moving: MovingUnit;
};

/**
 * Trait for units that can move
 */
export default class MovingUnit extends MovingObject {

	declare owner: IMovingUnit;

	sendWaypoints(waypoints: Vector2[]) {
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
		const packet1 = packets.WaypointGroupWithSpeed.create({
			syncId: performance.now(),

			netId: 0,
			movementData: [{
				teleportNetId: this.owner.netId,
				waypoints: [this.owner.position, ...this.waypointsForced.slice(0, 2)],
				speedParams: this.speedParams,
			}],
		});

		this.owner.packets.toVision(packet1);
		//console.log(packet1);
	}

	moveAns(teleport = false) {
		// this should be in Movement_Simulation so we can resend if destination will change (following moveable unit)
		// or following should be made with dash.speedParams.followNetId ?
		const packet1 = packets.WaypointGroup.create({
			syncId: performance.now(),
			netId: 0,
			movementData: [{
				teleportNetId: this.owner.netId,
				teleportId: teleport ? this.getNextTeleportId() : 0,
				waypoints: this.waypointsHalt ? [this.owner.position] : [this.owner.position, ...this._waypoints.slice(0, 2)],
			}],
		});
		this.owner.packets.toVision(packet1);
		//console.log('WaypointGroup', packet1);
		//console.log('WaypointGroup.waypoints', packet1.waypoints);
		//console.trace();
	}

}
