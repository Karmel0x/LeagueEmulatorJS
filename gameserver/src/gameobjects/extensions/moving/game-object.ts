
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
import { CMovementDataNormalModel } from '@workspace/packets/packages/packets/shared/CMovementDataNormal';
import { MovementData, MovementDataType } from '@workspace/packets/packages/packets/base/s2c/0xBA-OnEnterVisibilityClient';
import MovementSimulation from '../../../game/components/movement-simulation';


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
	'collision': (target: GameObject) => void;
};

export interface IMovingGameObject extends GameObject {
	eventEmitter: TypedEventEmitter<MovingEvents>;
	moving: MovingGameObject;
	stats: StatsGameObject & {
		moveSpeed: IStat;
	};
}

/**
 * Trait for units that can move
 */
export default class MovingGameObject {
	owner;
	orderId = 0;

	constructor(owner: IMovingGameObject) {
		this.owner = owner;

		this.owner.eventEmitter.on('cancelOrder', () => {
			this.orderId++;
			this.moveClear();
		});
	}

	_waypoints: Vector2[] = [];
	waypointsForced: Vector2[] = [];
	waypointsHalt = false;
	sentWaypointsType = -1;
	sentWaypoint = new Vector2();
	followUnit?: GameObject = undefined;
	moveTime = 0;
	speedParams?: SSpeedParamsModel = undefined;
	followRange = 0;

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

	sendWaypoints(waypoints: Vector2[]) {

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

	/**
	 * 
	 */
	move1(position: Vector2) {
		this.setWaypoints([position]);
	}

	sendDebugData(trace: string, movementData: CMovementDataNormalModel) {
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

	get movementData(): MovementData {

		let unitWaypoints = this.waypoints;
		if (unitWaypoints.length) {
			return {
				type: this.speedParams ? MovementDataType.withSpeed : MovementDataType.normal,
				teleportNetId: this.owner.netId,
				syncId: performance.now(),
				waypoints: [this.owner.position, ...unitWaypoints],
				speedParams: this.speedParams,
			};
		}

		return {
			type: MovementDataType.stop,
			syncId: performance.now(),
			position: this.owner.position,
			forward: { x: 0, y: 0 },
		};
	}

	teleportId = 0;
	getNextTeleportId() {
		return (this.teleportId++ % 255) + 1;
	}

	moveAns(teleport = false) {

	}

	/**
	 * @throws {Error} if order changed
	 */
	async moveToRange(target: Vector2 | GameObject, range: number = 0) {
		if (this.owner.distanceTo(target) <= range)
			return;

		let movePosition = Measure.centerToCenter.getPositionToTargetMinusRange(this.owner, target, Math.max(range - 0.1, 0));
		this.move1(movePosition);

		let orderId = this.orderId;
		while (this.owner.distanceTo(target) > range) {
			await Promise.delay(MovementSimulation.moveInterval);

			if (orderId != this.orderId)
				throw new Error('order changed');
		}
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
