
import type { Vector2 } from '@repo/geometry';
import * as packets from '@repo/packets/list';
import type { SSpeedParamsModel } from '@repo/packets/shared/SSpeedParams';
import type { Player } from '../../gameobjects/unit-ai';
import type AttackableUnit from '../../gameobjects/units/attackable-unit';
import * as Measure from '../measure';
import MovingGameObject, { type MovingEvents, SpeedParams } from './game-object';

export type MovingUnitEvents = MovingEvents & {
};

/**
 * Trait for units that can move
 */
export default class MovingUnit extends MovingGameObject {

	declare readonly owner: AttackableUnit;
	forceSendWaypoints = false;

	constructor(owner: AttackableUnit) {
		super(owner);

		//owner.eventEmitter.on('launchAttack', (attackTarget) => {
		//	this.forceSendWaypoints = true;
		//});
		//
		//owner.eventEmitter.on('spellCast', (castData) => {
		//	this.forceSendWaypoints = true;
		//});
	}

	sendWaypoints(waypoints: Vector2[] | undefined = undefined) {
		waypoints = waypoints || this.waypoints;

		const forcedMovement = this.waypointsForced.length > 0;
		const waypointsType = forcedMovement ? 1 : 0;

		if (!forcedMovement) {
			if (this.waypointsHalt) {
				waypoints = [];
			}
			else {
				waypoints = waypoints.slice(0, 2);
			}
		}

		const nextWaypoint = waypoints[0] || this.owner.position;

		let shouldSend = false;
		if (!shouldSend)
			shouldSend = this.forceSendWaypoints;
		if (!shouldSend)
			shouldSend = this.sentWaypointsType !== waypointsType;
		if (!shouldSend)
			shouldSend = this.sentWaypoint.distanceTo(nextWaypoint) > 1;

		if (shouldSend) {
			this.forceSendWaypoints = false;
			this.sentWaypointsType = waypointsType;
			this.sentWaypoint = nextWaypoint.clone();

			if (waypointsType) {
				// TODO
				waypoints = this.waypointsForced;
			}

			this.moveAns(waypoints);
		}

	}

	moveAns(waypoints: Vector2[], teleport = false) {
		// this should be in Movement_Simulation so we can resend if destination will change (following moveable unit)
		// or following should be made with dash.speedParams.followNetId ?

		waypoints = [this.owner.position, ...waypoints];
		(this.owner.ai as Player)?.packets?.chatBoxDebugMessage('moveAns:', waypoints.map(p => ({
			x: p.x.toFixed(4),
			y: p.y.toFixed(4),
		})));

		if (teleport) {
			if (this.speedParams && this.speedParams.pathSpeedOverride) {
				// not needed here, rather should be used for batch
				const packet1 = packets.WaypointGroupWithSpeed.create({
					syncId: performance.now(),
					netId: 0,
					movementData: [{
						teleportNetId: this.owner.netId,
						teleportId: teleport ? this.getNextTeleportId() : 0,
						waypoints,
						speedParams: this.speedParams,
					}],
				});
				this.owner.packets.toVision(packet1);
			} else {
				const packet1 = packets.WaypointGroup.create({
					syncId: performance.now(),
					netId: 0,
					movementData: [{
						teleportNetId: this.owner.netId,
						teleportId: teleport ? this.getNextTeleportId() : 0,
						waypoints,
					}],
				});
				this.owner.packets.toVision(packet1);
			}
		} else {
			if (this.speedParams && this.speedParams.pathSpeedOverride) {
				const packet1 = packets.WaypointListHeroWithSpeed.create({
					syncId: performance.now(),
					netId: this.owner.netId,
					waypoints,
					speedParams: this.speedParams,
				});
				this.owner.packets.toVision(packet1);
			} else {
				const packet1 = packets.WaypointList.create({
					syncId: performance.now(),
					netId: this.owner.netId,
					waypoints,
				});
				this.owner.packets.toVision(packet1);
			}
		}

		//console.log('WaypointGroup', packet1);
		//console.log('WaypointGroup.waypoints', packet1.waypoints);
		//console.trace();
	}

	/**
	 * dash to position, but you should use dashTo probably
	 */
	dash(position: Vector2, speedParams: Partial<SSpeedParamsModel>) {
		this.speedParams = new SpeedParams(speedParams);

		this.waypointsForced = [position];

		this.owner.eventEmitter.once('reachDestination', () => {
			//this.waypointsForced = [];
			this.speedParams = undefined;
			this.owner.eventEmitter.emit('dashed');
		});
	}

	/**
	 * dash unit to position
	 */
	dashTo(position: Vector2, options: { speed: number, range: number, minRange?: number }, speedParams: Partial<SSpeedParamsModel> | undefined = undefined) {
		const pos = Measure.centerToCenter.getPositionBetweenRange(this.owner, position, { maximum: options.range, minimum: options.minRange || options.range });
		this.dash(pos, { pathSpeedOverride: options.speed, ...speedParams });
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

		const pos = Measure.centerToCenter.getPositionBetweenRange(this.owner, position, { maximum: distance, minimum: minDistance });
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

		const position = Measure.general.getRandomPositionClamped(this.owner, 10);
		this.dash(position, options);
	}

}
