
import { Vector2 } from '@repo/geometry';
import * as packets from '@repo/packets/list';
import type { SSpeedParamsModel } from '@repo/packets/shared/SSpeedParams';
import Server from '../../app/server';
import { ChannelingStopSource } from '../../constants/enums';
import { humanizeWaypoints } from '../../core/utils';
import Pathfinding from '../../game/components/pathfinding';
import type GameObject from '../../gameobjects/game-object';
import type { Player } from '../../gameobjects/unit-ai';
import type AttackableUnit from '../../gameobjects/units/attackable-unit';
import * as Measure from '../measure';
import { TeamId } from '../traits/team';
import MovingGameObject, { type MovingEvents, SpeedParams } from './game-object';

export type MovingUnitEvents = MovingEvents & {
	'followRangeFulfill': () => void;
};

/**
 * Trait for units that can move
 */
export default class MovingUnit extends MovingGameObject {

	declare readonly owner: AttackableUnit;
	forceSendWaypoints = false;
	followUnit?: AttackableUnit = undefined;
	followRange = 0;
	isMoving = false;
	resolvedWaypoints: Vector2[] = [];
	pathfindingTime: number = 0;

	get position() {
		return this.owner.position;
	}

	get collisionRadius() {
		return this.owner.stats.collisionRadius.total;
	}

	get moveSpeed() {
		return this.owner.stats.moveSpeed.total;
	}

	get direction() {
		return this.owner.direction;
	}

	get collisionGroup() {
		return this.owner.team.id;
	}

	get waypoints() {
		const waypoints = super.waypoints;
		if (waypoints === this.waypointsOrdered) {
			if (waypoints.length < 1) {
				this.resolvedWaypoints = [];
				return waypoints;
			}

			const resolvedWaypoints = this.resolvedWaypoints;
			if (resolvedWaypoints.length > 1)
				return resolvedWaypoints;
		}
		return waypoints;
	}

	constructor(owner: AttackableUnit) {
		super(owner);

		//owner.eventEmitter.on('launchAttack', (attackTarget) => {
		//	this.forceSendWaypoints = true;
		//});
		//
		//owner.eventEmitter.on('spellCast', (castData) => {
		//	this.forceSendWaypoints = true;
		//});

		const interval1 = setInterval(() => {
			if (owner.combat.died)
				return;

			const followUnit = this.followUnit;
			if (!followUnit)
				return;
			if (followUnit.combat.died) {
				this.followUnit = undefined;
				return;
			}

			const followRange = this.followRange || 1;
			const distanceToTarget = owner.distanceTo(followUnit);
			if (distanceToTarget <= followRange) {
				//this.moveType = MoveType.followingIsInRange;
				owner.eventEmitter.emit('followRangeFulfill');
				this.resolvedWaypoints = [];
				this.waypointsOrdered = [];
				this.destination = this.owner.position.clone();
				this.sentWaypoints = '';
				return;
			}

			if (!this.ableToFollow(followUnit)) {
				this.followUnit = undefined;
				return;
			}

			if (followUnit.position.distanceTo(this.destination) < 0.1)
				return;

			this.waypointsOrdered = [followUnit.position.clone()];
			this.destination = followUnit.position.clone();
		}, 33);

		owner.eventEmitter.once('destroy', () => {
			clearInterval(interval1);
		});
	}

	ableToFollow(target: GameObject) {
		const unit = target as AttackableUnit;
		const ai = unit.ai;
		if (!ai)
			return false;

		const owner = this.owner;
		if (owner.team.id !== TeamId.neutral) {
			const lastSeenUnitByTeam = Server.movement.lastSeenUnitsByTeam[owner.team.id];
			if (!lastSeenUnitByTeam)
				return false;

			const isLastSeen = lastSeenUnitByTeam.has(unit);
			if (!isLastSeen)
				return false;
		}

		return true;
	}

	setWaypoints(waypoints: Vector2[]) {
		const owner = this.owner;
		if (owner.characterState.channeling) {
			try {
				owner.combat.cancelChanneling(ChannelingStopSource.move);
			} catch (e) {
				if (e instanceof Error) {
					console.log(e.message);
					return;
				}
			}
		}

		this.followUnit = undefined;
		this.followRange = 0;
		super.setWaypoints(waypoints);
	}

	moveClear() {
		this.followUnit = undefined;
		this.followRange = 0;
		super.moveClear();
	}

	canMove() {
		const owner = this.owner;
		const characterState = owner.characterState;

		if (!characterState.canMove)
			return false;
		if (characterState.rooted)
			return false;
		if (characterState.sleep)
			return false;
		if (characterState.stunned)
			return false;
		if (characterState.suppressed)
			return false;
		if (characterState.netted)
			return false;

		//if (characterState.charmed)
		//	return true;
		//if (characterState.taunted)
		//	return true;

		return true;
	}

	waypointsHalted() {
		if (!this.canMove())
			return true;

		const owner = this.owner;
		if (owner.combat.castingSpell.length > 0)
			return true;

		const characterState = owner.characterState;
		if (characterState.channeling)
			return true;

		return super.waypointsHalted();
	}

	sendWaypoints(waypoints: Vector2[] | undefined = undefined) {
		//const owner = this.owner;
		//if (owner.characterState.noRender || owner.character.neverRender)
		//	return;
		//
		//// TODO: delay if last send was in last 33ms?
		//// maybe make a loop and use property markedToSend?
		//waypoints = waypoints || this.waypoints;
		//
		//const forcedMovement = this._waypointsForced.length > 0;
		//const waypointsType = forcedMovement ? 1 : 0;
		//
		//if (!forcedMovement) {
		//	if (this.waypointsHalted()) {
		//		waypoints = [];
		//	}
		//	else {
		//		waypoints = waypoints.slice(0, 2);
		//	}
		//}
		//
		//const nextWaypoint = waypoints[0] || owner.position;
		//
		//let shouldSend = false;
		//if (!shouldSend)
		//	shouldSend = this.forceSendWaypoints;
		//if (!shouldSend)
		//	shouldSend = this.sentWaypointsType !== waypointsType;
		//if (!shouldSend)
		//	shouldSend = this.sentWaypoint.distanceTo(nextWaypoint) > 1;
		//
		//if (shouldSend) {
		//	this.forceSendWaypoints = false;
		//	this.sentWaypointsType = waypointsType;
		//	this.sentWaypoint = nextWaypoint.clone();
		//
		//	if (waypointsType) {
		//		// TODO
		//		waypoints = this._waypointsForced;
		//	}
		//
		//	this.moveAns(waypoints);
		//}

	}

	moveAns(waypoints: Vector2[], teleport = false) {
		// this should be in Movement_Simulation so we can resend if destination will change (following moveable unit)
		// or following should be made with dash.speedParams.followNetId ?

		const owner = this.owner;
		if (owner.characterState.noRender || owner.character.neverRender)
			return;

		waypoints = [owner.position, ...waypoints];
		(owner.ai as Player).packets?.chatBoxDebugMessage('moveAns:', humanizeWaypoints(waypoints));

		//if (teleport) {
		if (this.speedParams && this.speedParams.pathSpeedOverride) {
			// not needed here, rather should be used for batch
			const packet1 = packets.WaypointGroupWithSpeed.create({
				syncId: ++Server.syncId,
				netId: 0,
				movementData: [{
					teleportNetId: owner.netId,
					teleportId: teleport ? this.getNextTeleportId() : 0,
					waypoints,
					speedParams: this.speedParams,
				}],
			});
			owner.packets.toVision(packet1);
		} else {
			const packet1 = packets.WaypointGroup.create({
				syncId: ++Server.syncId,
				netId: 0,
				movementData: [{
					teleportNetId: owner.netId,
					teleportId: teleport ? this.getNextTeleportId() : 0,
					waypoints,
				}],
			});
			owner.packets.toVision(packet1);
		}
		//} else {
		//	if (this.speedParams && this.speedParams.pathSpeedOverride) {
		//		const packet1 = packets.WaypointListHeroWithSpeed.create({
		//			syncId: ++Server.syncId,
		//			netId: owner.netId,
		//			waypoints,
		//			speedParams: this.speedParams,
		//		});
		//		owner.packets.toVision(packet1);
		//	} else {
		//		const packet1 = packets.WaypointList.create({
		//			syncId: ++Server.syncId,
		//			netId: owner.netId,
		//			waypoints,
		//		});
		//		owner.packets.toVision(packet1);
		//	}
		//}

		//console.log('WaypointGroup', packet1);
		//console.log('WaypointGroup.waypoints', packet1.waypoints);
		//console.trace();
	}

	/**
	 * dash to position, but you should use dashTo probably
	 */
	dash(position: Vector2, speedParams: Partial<SSpeedParamsModel>) {
		const owner = this.owner;
		this.speedParams = new SpeedParams(speedParams);
		this.waypointsForced = [position];

		const reachDestination = owner.eventEmitter.on2('reachDestination', () => {
			//this.waypointsForced = [];
			if (this._waypointsForced.length > 0)
				return;

			//this.speedParams = undefined;
			owner.eventEmitter.off('reachDestination', reachDestination);
			owner.eventEmitter.emit('dashed');
		});
	}

	/**
	 * dash to position, but you should use dashTo probably
	 */
	dash2(position: Vector2, speedParams: Partial<SSpeedParamsModel>) {
		const escapedPosition = Pathfinding.terrainEscape(position);
		const position2 = escapedPosition || position;
		const position3 = new Vector2(position2.x, position2.y);
		this.dash(position3, speedParams);
	}

	/**
	 * dash unit to position
	 */
	dashTo(position: Vector2, options: { speed: number, range: number, minRange?: number }, speedParams: Partial<SSpeedParamsModel> | undefined = undefined) {
		const pos = Measure.centerToCenter.getPositionBetweenRange(this.owner, position, { maximum: options.range, minimum: options.minRange ?? options.range });
		this.dash2(pos, { pathSpeedOverride: options.speed, ...speedParams });
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
		this.dash2(pos, options);
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
		this.dash2(position, options);
	}

	follow(target: AttackableUnit, followRange: number) {
		this.followRange = followRange;
		if (this.followUnit === target)
			return;

		if (target.combat.died)
			return;

		if (this.owner.distanceTo(target) <= followRange) {
			//this.waypointsOrdered = [];
			this.followUnit = target;
			return;
		}

		//this.waypointsOrdered = [target.position.clone()];
		this.followUnit = target;

		//this.speedParams = new SpeedParams({
		//	followTarget: target,
		//	followDistance: range,
		//});
	}

	onceInRange(callback: () => void) {
		const owner = this.owner;
		const listener = () => {
			try {
				callback();
			}
			catch (e) {
				console.log('onceInRange callback error', e);
			}
		};
		owner.eventEmitter.once('followRangeFulfill', listener);
		owner.eventEmitter.once('changeOrder', (issuedOrder) => {
			owner.eventEmitter.off('followRangeFulfill', listener);
		});
	}

	onceWhenInRange(target: AttackableUnit, range: number, callback: () => void) {
		const owner = this.owner;
		const listener = () => {
			try {
				callback();
			}
			catch (e) {
				console.log('onceWhenInRange callback error', e);
			}
		};

		const interval1 = setInterval(() => {
			if (owner.combat.died) {
				clearInterval(interval1);
				return;
			}

			const distanceToTarget = owner.distanceTo(target);
			if (distanceToTarget <= range) {
				clearInterval(interval1);
				listener();
			}
		}, 250);

		owner.eventEmitter.once('changeOrder', (issuedOrder) => {
			clearInterval(interval1);
		});
	}

}
