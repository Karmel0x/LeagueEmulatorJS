
import { Vector2 } from 'three';
import * as packets from '@repo/packets/list';
import MovingGameObject, { MovingEvents } from './game-object';
import TypedEventEmitter from 'typed-emitter';
import Unit, { UnitEvents } from '../../units/unit';
import * as Measure from '../measure';
import { SSpeedParamsModel } from '@repo/packets/shared/SSpeedParams';

export type MovingUnitEvents = MovingEvents & UnitEvents & {
	'dashed': () => void;
};

export interface IMovingUnit extends Unit {
	eventEmitter: TypedEventEmitter<MovingUnitEvents>;
	moving: MovingUnit;
};

/**
 * Trait for units that can move
 */
export default class MovingUnit extends MovingGameObject {

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

	/**
	 * dash to position, but you should use dashTo probably
	 */
	dash(position: Vector2, speedParams: Partial<SSpeedParamsModel>) {
		this.speedParams = {
			pathSpeedOverride: speedParams.pathSpeedOverride || 1000,
			parabolicGravity: speedParams.parabolicGravity || 0,
			parabolicStartPoint: speedParams.parabolicStartPoint || { x: 0, y: 0 },
			facing: speedParams.facing || false,
			followNetId: speedParams.followNetId || 0,
			followDistance: speedParams.followDistance || 0,
			followBackDistance: speedParams.followBackDistance || 0,
			followTravelTime: speedParams.followTravelTime || 0,
		};

		this.waypointsForced = [position];

		//@todo
		this.owner.eventEmitter.once('reachDestination', () => {
			//this.waypointsForced = [];
			this.speedParams = undefined;
			this.owner.eventEmitter.emit('dashed');
		});
	}

	/**
	 * dash unit to position
	 */
	dashTo(position: Vector2, options: { speed: number, range: number, minRange?: number }) {
		let pos = Measure.centerToCenter.getPositionBetweenRange(this.owner, position, { maximum: options.range, minimum: options.minRange || options.range });
		this.dash(pos, { pathSpeedOverride: options.speed });
	}

	/**
	 * Knock unit aside (closer to us)
	 * @todo calculate options for easier usage
	 */
	knockAside(position: Vector2, distance: number = 100, minDistance: number | undefined = undefined, options: { speed?: number; duration?: number; parabolicGravity?: number; facing?: boolean; } = {}) {
		minDistance = minDistance ?? distance;
		options.speed = options.speed || (Math.abs(distance) / (options.duration || 1));
		options.parabolicGravity = options.parabolicGravity || 0;
		options.facing = options.facing ?? true;

		let pos = Measure.centerToCenter.getPositionBetweenRange(this.owner, position, { maximum: distance, minimum: minDistance });
		this.dash(pos, options);
	}

	/**
	 * Knock unit back (further to us)
	 */
	knockBack(position: Vector2, distance: number = 100, minDistance: number | undefined = undefined, options: { speed?: number, duration?: number } = {}) {
		this.knockAside(position, -distance, minDistance && -minDistance, options);
	}

	/**
	 * Knock unit up
	 * @todo calculate options for easier usage
	 */
	knockUp(options: Partial<SSpeedParamsModel> & { duration?: number } = {}) {
		options.pathSpeedOverride = options.pathSpeedOverride || (10 / (options.duration || 1));
		options.parabolicGravity = options.parabolicGravity || 16.5;
		options.facing = options.facing ?? true;

		let position = Measure.general.getRandomPositionClamped(this.owner, 10);
		this.dash(position, options);
	}

}
