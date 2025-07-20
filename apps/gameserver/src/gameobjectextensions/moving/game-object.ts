
import { Vector2, type Vector2Like } from '@repo/geometry';
import { type MovementData, MovementDataType } from '@repo/packets/base/s2c/0xBA-OnEnterVisibilityClient';
import type { CMovementDataNormalModel } from '@repo/packets/shared/CMovementDataNormal';
import type { SSpeedParamsModel } from '@repo/packets/shared/SSpeedParams';
import GameObjectList from '../../app/game-object-list';
import type GameObject from '../../gameobjects/game-object';
import type MovableGameObject from '../../gameobjects/movable-game-object';


export enum ActionStates {
	canAttack = 0x1,
	canCast = 0x2,
	canMove = 0x4,
	defaultStates = 0x7,
	immovable = 0x8,
};

export enum MoveType {
	unknown,
	idle,
	moving,
	dashing,
	halted,
	following,
	followingIsInRange,
};

export enum NavigationCellFlags {
	none = 0x0,
	wallOfGrass = 0x1,
	transparentTerrain = 0x2,
	antiBrush = 0x4,
};

export type MovingEvents = {
	'setWaypoints': (waypoints: Vector2[]) => void;
	'reachDestination': () => void;
	'collision': (target: GameObject) => void;
	'dashed': () => void;
	'moveEnd': () => void;
	/** should be emitted before moveEnd */
	'moveFailure': () => void;
	/** should be emitted before moveEnd */
	'moveSuccess': () => void;
};

export class SpeedParams implements SSpeedParamsModel {

	pathSpeedOverride = 0;
	parabolicGravity = 0;
	parabolicStartPoint = { x: 0, y: 0 };
	facing = false;

	_followTarget: GameObject | undefined = undefined;
	get followTarget() {
		return this._followTarget;
	}
	set followTarget(value) {
		this._followTarget = value;
	}

	get followNetId() {
		return this._followTarget?.netId || 0;
	}
	set followNetId(value) {
		this._followTarget = GameObjectList.objectByNetId[value];
	}

	followDistance = 0;
	followBackDistance = 0;
	followTravelTime = 0;

	constructor(speedParams: Partial<SSpeedParamsModel & { followTarget: GameObject }> = {}) {
		if (speedParams.pathSpeedOverride)
			this.pathSpeedOverride = speedParams.pathSpeedOverride;
		if (speedParams.parabolicGravity)
			this.parabolicGravity = speedParams.parabolicGravity;
		if (speedParams.parabolicStartPoint)
			this.parabolicStartPoint = speedParams.parabolicStartPoint;
		if (speedParams.facing)
			this.facing = speedParams.facing;
		if (speedParams.followTarget)
			this.followTarget = speedParams.followTarget;
		else if (speedParams.followNetId)
			this.followNetId = speedParams.followNetId;
		if (speedParams.followDistance)
			this.followDistance = speedParams.followDistance;
		if (speedParams.followBackDistance)
			this.followBackDistance = speedParams.followBackDistance;
		if (speedParams.followTravelTime)
			this.followTravelTime = speedParams.followTravelTime;
	}

}

/**
 * Trait for units that can move
 */
export default class MovingGameObject {
	readonly owner;
	orderId = 0;

	constructor(owner: MovableGameObject) {
		this.owner = owner;
	}

	_waypoints: Vector2[] = [];
	moveSyncId = 0;
	collisionWaypoint = false;
	collisionIteration = 0;

	private _waypointsForced: Vector2[] = [];
	lastWaypointsForcedCount = 0;

	set waypointsForced(waypoints: Vector2[]) {
		if (this._waypointsForced.length !== 0) {
			this.owner.eventEmitter.emit('moveFailure');
			this.owner.eventEmitter.emit('moveEnd');
		}

		this._waypointsForced = waypoints;
	}

	get waypointsForced() {
		if (this._waypointsForced.length === 0 && this.lastWaypointsForcedCount !== 0) {
			this.owner.eventEmitter.emit('moveSuccess');
			this.owner.eventEmitter.emit('moveEnd');
		}

		this.lastWaypointsForcedCount = this._waypointsForced.length;
		return this._waypointsForced;
	}

	waypointsHaltList: any[] = [];
	get waypointsHalt() {
		return this.waypointsHaltList.length > 0
	}

	haltMovement() {
		this.waypointsHaltList.push(true);
		return [true];
	}

	unhaltMovement(list: boolean[]) {
		while (list.length > 0) {
			this.waypointsHaltList.pop();
			list.pop();
		}
	}

	sentWaypointsType = -1;
	sentWaypoint = new Vector2();
	speedParams?: SpeedParams = undefined;
	placeFlag = NavigationCellFlags.none;
	moveType = MoveType.unknown;

	get waypoints() {
		if (this.waypointsHalt) {
			this.moveType = MoveType.halted;
			return [];
		}

		const waypointsForced = this.waypointsForced;
		if (waypointsForced.length) {
			this.moveType = MoveType.dashing;
			return waypointsForced;
		}

		if (this.speedParams) {
			const followTarget = this.speedParams.followTarget;
			if (followTarget) {
				const destination = followTarget.position;

				const followDistance = this.speedParams.followDistance || 1;
				const distanceToTarget = this.owner.distanceTo(destination);
				if (distanceToTarget <= followDistance) {
					this.moveType = MoveType.followingIsInRange;
					return [];
				}

				this.moveType = MoveType.following;
				return [destination];
			}
		}

		const waypoints = this._waypoints;
		if (waypoints.length < 1) {
			this.moveType = MoveType.idle;
			return [];
		}

		this.speedParams = undefined;
		this.moveType = MoveType.moving;
		return this._waypoints;
	}

	set waypoints(value) {
		if (!value)
			value = [];

		if (!Array.isArray(value))
			value = [value];

		this._waypoints = value;
		this.moveSyncId++;
	}

	sendWaypoints(waypoints: Vector2[] | undefined = undefined) {

	}

	/**
	 * Set waypoint for movement
	 * @todo repath if needed
	 */
	setWaypoints(waypoints: Vector2[]) {
		this.waypoints = waypoints;
		this.speedParams = undefined;
		this.owner.eventEmitter.emit('setWaypoints', this.waypoints);
	}

	get speed() {
		return this.speedParams?.pathSpeedOverride || this.owner.stats.moveSpeed.total;
	}

	/**
	 * Teleport to position (..)
	 */
	teleport(position: Vector2, send: boolean = true) {
		this.owner.position.copy(position);

		if (send)
			this.moveAns([], true);
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
		//this.owner.packets.chatBoxDebugMessage(message);
	}

	moveTo(packet: {
		//position: SVector3Model;
		movementData?: {
			waypoints?: Vector2Like[];
		};
	}) {

		const movementData = packet.movementData;
		if (!movementData)
			return;

		this.sendDebugData('move0', movementData);

		const newWaipoints = movementData.waypoints;
		if (!newWaipoints || !newWaipoints.length)
			return;

		//if (Server.usePathFinding) {
		//	// idk if it's even necessary here but MoveData.waypoints are wrong when character is dashing
		//	newWaipoints = Pathfinding.getPath(this.owner.position, packet.position);
		//	//console.log({waypoints: movementData.waypoints, newWaipoints});
		//}

		// first waypoint is current position
		newWaipoints.shift();

		if (newWaipoints && newWaipoints.length) {
			this.setWaypoints(newWaipoints.map(p => new Vector2(p.x, p.y)));
		}
	}

	moveClear() {
		this.waypoints = [];
		this.speedParams = undefined;
	}

	get movementData(): MovementData {

		const unitWaypoints = this.waypoints;
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
			forward: { x: 1, y: 0 },
		};
	}

	teleportId = 0;
	getNextTeleportId() {
		return (this.teleportId++ % 255) + 1;
	}

	moveAns(waypoints: Vector2[], teleport = false) {

	}

	///**
	// * @throws {Error} if order changed
	// */
	//async moveToRange(target: Vector2 | GameObject, range: number = 0) {
	//	if (this.owner.distanceTo(target) <= range)
	//		return;
	//
	//	let movePosition = Measure.centerToCenter.getPositionToTargetMinusRange(this.owner, target, Math.max(range - 0.1, 0));
	//	this.move1(movePosition);
	//
	//	let orderChanged = false;
	//	this.owner.eventEmitter.once('changeOrder', () => {
	//		orderChanged = true;
	//	});
	//
	//	while (this.owner.distanceTo(target) > range) {
	//		await delay(MovementSimulation.moveInterval);
	//
	//		if (orderChanged)
	//			throw new Error('order changed');
	//	}
	//}

	//stopFollowing() {
	//	this.followUnit = undefined;
	//}
	//
	//inRangeOrFollow(range: number, target: GameObject, reachDestinationCallback: () => void) {
	//	let rangeSum = range + this.owner.collisionRadius + target.collisionRadius;
	//	if (this.owner.distanceTo(target) > rangeSum) {
	//
	//		this.followUnit = target;
	//		this.owner.eventEmitter.once('reachDestination', reachDestinationCallback);
	//		(this.owner.eventEmitter as EventEmitter2<SpellableEvents>).once('cancelSpell', () => {
	//			this.stopFollowing();
	//			this.owner.eventEmitter.removeListener('reachDestination', reachDestinationCallback);
	//		});
	//
	//		return false;
	//	}
	//
	//	return true;
	//}

	follow(target: GameObject, range: number) {
		this.waypoints = [];
		this.speedParams = new SpeedParams({
			followTarget: target,
			followDistance: range,
		});
	}

}
