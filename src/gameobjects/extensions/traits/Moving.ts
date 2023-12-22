
import { Vector2 } from 'three';
import Pathfinding, { Vector2Like } from '../../../game/components/Pathfinding';
import { IStat } from './IStat';
import PositionHelper from '../Measure/index';
import Server from '../../../app/Server';
import { MovableObject } from '../../GameObjects';
import GameObject from '../../GameObject';


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
export default class Moving {
	owner;
	moveSpeed: IStat;

	constructor(owner: MovableObject, speed: number | undefined = 0) {
		this.owner = owner;

		this.moveSpeed = new IStat(speed || 325);
	}

	_waypoints: Vector2[] = [];
	waypointsForced: Vector2[] = [];
	waypointsHalt = false;
	sentWaypointsType = -1;
	sentWaypoint = new Vector2();
	followUnit?: GameObject = undefined;
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
	 */
	setWaypoints(waypoints: Vector2[]) {
		this.waypoints = waypoints;
		this.owner.emit('setWaypoints', this.waypoints);
	}

	/**
	 * Teleport to position (..)
	 */
	teleport(position: Vector2, send: boolean = true) {
		this.owner.position.copy(position);

		if (send)
			this.moveAns(true);
	}

	dashAns() {

	}

	/**
	 * Dash to position, but you should use dashTo probably
	 */
	dash(position: Vector2, options: { speed?: number; parabolicGravity?: number; parabolicStartPoint?: Vector2Like; facing?: number; followNetId?: number; followDistance?: number; followBackDistance?: number; followTravelTime?: number; }) {
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
	 */
	dashTo(position: Vector2, options: { speed: number, range: number, minRange: number, callback: any }) {
		let pos = PositionHelper.getPositionBetweenRange(this.owner, position, { maximum: options.range, minimum: options.minRange || options.range });
		this.dash(pos, options);
	}

	/**
	 * Knock unit aside (closer to us)
	 * @todo calculate options for easier usage
	 */
	knockAside(position: Vector2, distance: number = 100, minDistance: number | undefined = undefined, options: { speed?: number; duration?: number; parabolicGravity?: number; facing?: number; } = {}) {
		minDistance = minDistance ?? distance;
		options.speed = options.speed || (Math.abs(distance) / (options.duration || 1));
		options.parabolicGravity = options.parabolicGravity || 0;
		options.facing = options.facing ?? 1;

		let pos = PositionHelper.getPositionBetweenRange(this.owner, position, { maximum: distance, minimum: minDistance });
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
	knockUp(options: { speed?: number; duration?: number; parabolicGravity?: number; facing?: number; } = {}) {
		options.speed = options.speed || (10 / (options.duration || 1));
		options.parabolicGravity = options.parabolicGravity || 16.5;
		options.facing = options.facing ?? 1;

		let position = this.owner.measure.getRandomPositionClamped(10);
		this.dash(position, options);
	}

	/**
	 * 
	 */
	move1(position: Vector2) {
		this.setWaypoints([position]);
	}

	sendDebugData(trace, movementData) {
		//if(!this.owner.packets.chatBoxMessage)
		//	return;
		//
		//let message = trace + ' ' + performance.now();
		//
		//let dist = this.waypoints[0].distanceTo(movementData.waypoints[0]);
		//let dist2 = this.waypoints[1] ? this.waypoints[0].distanceTo(this.waypoints[1]) : '';
		//let dist3 = this.waypoints[1] ? movementData.waypoints[0].distanceTo(this.waypoints[1]) : '';
		//
		//message += "\n";
		//message += dist + ' / ' + dist2 + ' / ' + dist3;
		//
		//message += "\n";
		//message += JSON.stringify(this.waypoints);
		//
		//message += "\n";
		//message += JSON.stringify(movementData.waypoints);
		//
		//this.owner.packets.chatBoxMessage(message);
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
		}

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
	 */
	moveWithCallback(target: Vector2 | GameObject, reachDestinationCallback: () => void, range: number = 0) {
		let movePosition = PositionHelper.getPositionToTargetMinusRange(this.owner, target, Math.max(range - 0.1, 0));
		this.move1(movePosition);
		this.owner.once('reachDestination', reachDestinationCallback);
		this.owner.once('cancelSpell', () => this.owner.removeListener('reachDestination', reachDestinationCallback));
	}

	stopFollowing() {
		this.followUnit = undefined;
	}

	inRangeOrFollow(range: number, target: GameObject, reachDestinationCallback: () => void) {
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
}
