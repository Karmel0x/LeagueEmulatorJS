
import * as packets from '@workspace/packets/packages/packets';
import { Vector2 } from 'three';
import Pathfinding from '../../../game/components/pathfinding';
import Server from '../../../app/server';
import GameObject, { GameObjectEvents } from '../../game-object';
import { IStat } from '../stats/istat';
import { Vector2Like } from '@workspace/packets/packages/packets/functions/translate-centered-coordinates';
import TypedEventEmitter from 'typed-emitter';
import { SpellableEvents } from '../combat/spellable';
import * as Measure from '../measure';
import StatsGameObject from '../stats/game-object';
import { SSpeedParamsModel } from '@workspace/packets/packages/packets/shared/SSpeedParams';


export enum ActionStates {
	canAttack = 0x1,
	canCast = 0x2,
	canMove = 0x4,
	defaultStates = 0x7,
	immovable = 0x8,
};

export type MovingEvents = GameObjectEvents & {
	'setWaypoints': (waypoints: Vector2[]) => void;
	'reachDestination': () => void;
}

export interface IMovingObject extends GameObject {
	eventEmitter: TypedEventEmitter<MovingEvents>;
	moving: MovingObject;
	stats: StatsGameObject & {
		moveSpeed: IStat;
	};
}

/**
 * Trait for units that can move
 */
export default class MovingObject {
	owner;

	constructor(owner: IMovingObject) {
		this.owner = owner;

	}

	_waypoints: Vector2[] = [];
	waypointsForced: Vector2[] = [];
	waypointsHalt = false;
	sentWaypointsType = -1;
	sentWaypoint = new Vector2();
	followUnit?: GameObject = undefined;
	moveTime = 0;
	speedParams?: SSpeedParamsModel = undefined;

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
		this.owner.eventEmitter.emit('setWaypoints', this.waypoints);
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
	dash(position: Vector2, speedParams: Partial<SSpeedParamsModel>, callback: (() => void) | undefined = undefined) {
		//this.ACTION = ACTIONS.DASHING;

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

		this.owner.callbacks.move.dash = {
			options: {
				range: 1,
			},
			function: () => {
				//this.ACTION = ACTIONS.FREE;
				delete this.owner.callbacks.move.dash;
				this.speedParams = null;

				if (callback)
					callback();
			}
		};
		//this.dashAns();
	}

	/**
	 * Public function to dash unit to position
	 */
	dashTo(position: Vector2, options: { speed: number, range: number, minRange: number, callback: any }) {
		let pos = Measure.centerToCenter.getPositionBetweenRange(this.owner, position, { maximum: options.range, minimum: options.minRange || options.range });
		this.dash(pos, { pathSpeedOverride: options.speed }, options.callback);
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

	move0(packet: packets.IssueOrderReqModel) {

		let movementData = packet.movementData;
		if (!movementData)
			return;

		this.sendDebugData('move0', movementData);
		//if(this.ACTION != ACTIONS.DASHING)
		//    this.moveCallback = null;
		if (this.owner.callbacks.move.pending)
			delete this.owner.callbacks.move.pending;

		let newWaipoints = movementData.waypoints;
		if (!newWaipoints || !newWaipoints.length)
			return;

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
		let movePosition = Measure.centerToCenter.getPositionToTargetMinusRange(this.owner, target, Math.max(range - 0.1, 0));
		this.move1(movePosition);

		this.owner.eventEmitter.once('reachDestination', reachDestinationCallback);
		(this.owner.eventEmitter as TypedEventEmitter<SpellableEvents>).once('cancelSpell', () => {
			this.owner.eventEmitter.removeListener('reachDestination', reachDestinationCallback)
		});
	}

	stopFollowing() {
		this.followUnit = undefined;
	}

	inRangeOrFollow(range: number, target: GameObject, reachDestinationCallback: () => void) {
		let rangeSum = range + this.owner.collisionRadius + target.collisionRadius;
		if (this.owner.distanceTo(target) > rangeSum) {

			this.followUnit = target;
			this.owner.eventEmitter.once('reachDestination', reachDestinationCallback);
			(this.owner.eventEmitter as TypedEventEmitter<SpellableEvents>).once('cancelSpell', () => {
				this.stopFollowing();
				this.owner.eventEmitter.removeListener('reachDestination', reachDestinationCallback);
			});

			return false;
		}

		return true;
	}
}
