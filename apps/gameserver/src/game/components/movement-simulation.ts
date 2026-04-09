import { Vector2, type Vector2Like } from '@repo/geometry';
import { filterInRange, isColliding, resolveCollision, type Collidable } from '@repo/geometry/collision';
import { moveTowardFor } from '@repo/geometry/movement';
import { findPathAroundObstacles } from '@repo/geometry/path-finding';
import { IssueOrderType } from '@repo/packets/base/c2s/0x72-IssueOrderReq';
import GameObjectList from '../../app/game-object-list';
import Server from '../../app/server';
import { NavigationCellFlags } from '../../gameobjectextensions/moving/game-object';
import { TeamId } from '../../gameobjectextensions/traits/team';
import type MovableGameObject from '../../gameobjects/movable-game-object';
import { AiType } from '../../gameobjects/unit-ai/types';
import type AttackableUnit from '../../gameobjects/units/attackable-unit';
import { sendUnitsMove } from '../../packet-helpers/movement';
import { forceUpdateUnitsStats } from '../../packet-helpers/on-replication';
import config from '../game.config';
import Pathfinding from './pathfinding';

export type Pathable = {
	destination: Vector2Like;
	waypoints: Vector2Like[];
	collisionGroup: number;
	pathfindingTime: number;
};

// https://leagueoflegends.fandom.com/wiki/Sight#Sight_Ranges
const defaultVisionRange = 1350;

/**
 * @todo a lot of stuff to create here
 * and a lot of stuff to improve here
 * maybe move this to IMovable ?
 */
export default class MovementSimulation {

	moved: { [n: number]: boolean; } = {};
	lastSeenUnitsByTeam: { [n: number]: Set<AttackableUnit>; } = {};

	/**
	 * @todo only process units that moved ?
	 * @todo improve loop to not repeat same unit pairs
	 */
	visionProcess_collectSeen(units: AttackableUnit[], updateTime: number) {
		const seenUnitsByTeam: { [n: number]: Set<AttackableUnit>; } = {};

		for (let i = 0; i < units.length; i++) {
			const unit = units[i]!;

			if (unit.team.id === TeamId.neutral)
				continue;

			if (unit.combat.died)
				continue;

			const unitTeamId = unit.team.id;
			const unitPosition = unit.position;
			const unitVisionRange = unit.visionRange || defaultVisionRange;
			const unitPlaceFlag = unit.moving.placeFlag;

			const seenUnits = seenUnitsByTeam[unitTeamId] || new Set();
			seenUnitsByTeam[unitTeamId] = seenUnits;

			for (let j = 0; j < units.length; j++) {
				const unit2 = units[j]!;

				if (unitTeamId === unit2.team.id)
					continue;

				if (unit2.combat.died)
					continue;

				if (seenUnits.has(unit2))
					continue;

				if (unit2.characterState.noRender || unit2.character.neverRender)
					continue;

				if (unit2.characterState.stealthed)
					continue;

				if (unitPosition.distanceTo(unit2.position) > unitVisionRange)
					continue;

				if (unit2.ai.type !== AiType.Building) {
					if (unit2.revealedUntil < updateTime) {
						if (unit2.moving.placeFlag === NavigationCellFlags.wallOfGrass) {
							if (unitPlaceFlag !== NavigationCellFlags.wallOfGrass)
								continue;
						}
					}

					if (!config.debugging.enabled || !config.debugging.noNavmeshVision) {
						const isPointVisible = Pathfinding.isPointVisible(unitPosition, unit2.position);
						if (!isPointVisible)
							continue;
					}
				}

				seenUnits.add(unit2);
			}
		}

		return seenUnitsByTeam;
	}

	/**
	 * Checks if unit is visible for enemy and broadcasting it
	 */
	visionProcess(units: AttackableUnit[], updateTime: number) {
		const seenUnitsByTeam = this.visionProcess_collectSeen(units, updateTime);
		const teams = Server.teams;

		// leaves the vision
		for (const i in this.lastSeenUnitsByTeam) {
			const teamId = parseInt(i);
			const teamUnits = this.lastSeenUnitsByTeam[teamId]!;

			const team = teams[teamId];
			if (!team)
				continue;

			const seenUnits = seenUnitsByTeam[teamId] || new Set();
			seenUnitsByTeam[teamId] = seenUnits;

			teamUnits.forEach(unit => {
				if (seenUnits.has(unit))
					return;

				if (unit.combat.died)
					return;

				team.vision(unit, false);
			});
		}

		// enters the vision
		for (const i in seenUnitsByTeam) {
			const teamId = parseInt(i);
			const teamUnits = seenUnitsByTeam[teamId]!;

			const team = teams[teamId];
			if (!team)
				continue;

			const lastSeenUnits = this.lastSeenUnitsByTeam[teamId] || new Set();
			const unitsEntered: AttackableUnit[] = [];

			teamUnits.forEach(unit => {
				if (lastSeenUnits.has(unit))
					return;

				team.vision(unit, true);
				unitsEntered.push(unit);
			});

			forceUpdateUnitsStats(unitsEntered, team);
		}

		this.lastSeenUnitsByTeam = seenUnitsByTeam;
	}

	setNavCellFlags(object: MovableGameObject) {
		const objectPosition = object.position;
		object.moving.placeFlag = NavigationCellFlags.none;
		const radius = object.selectionRadius || object.collisionRadius;
		if (Pathfinding.isInGrass(objectPosition, radius))
			object.moving.placeFlag = NavigationCellFlags.wallOfGrass;
	}

	actualMove(object: MovableGameObject, waypoints: Vector2[], moveSpeed: number, diff: number, facing = true) {
		const objectPosition = object.position;
		const prevPosition = objectPosition.clone();
		object.moving.premovePosition = prevPosition.clone();
		const leftDiff = moveTowardFor(objectPosition, waypoints, moveSpeed, diff);
		if (leftDiff) {
			object.eventEmitter.emit('reachDestination');
		}

		if (facing) {
			const direction = prevPosition.sub(objectPosition).normalize();
			object.direction.copy(direction);
		}

		return leftDiff;
	}

	moveForced(object: MovableGameObject, diff: number) {
		const moveSpeed = object.moving.speedParams?.pathSpeedOverride ?? object.stats.moveSpeed.total;
		if (!moveSpeed)
			return diff;

		const waypoints = object.moving.waypointsForced;
		let nextWaypoint = waypoints[0];
		if (!nextWaypoint)
			return diff;

		const facing = object.moving.speedParams?.facing;

		let leftDiff = this.actualMove(object, waypoints, moveSpeed, diff, facing);
		return leftDiff;
	}

	collisionWaypointsToSend: Record<number, [AttackableUnit, Vector2]> = {};

	moveNormal(object: MovableGameObject, diff: number, aliveUnits: AttackableUnit[]) {
		const moveSpeed = object.stats.moveSpeed.total;
		if (!moveSpeed)
			return diff;

		let waypoints = object.moving.waypoints;
		let nextWaypoint = waypoints[0];
		if (!nextWaypoint)
			return diff;

		const facing = true;

		//const position = object.position;
		//const premovePosition = position.clone();
		let leftDiff = this.actualMove(object, waypoints, moveSpeed, diff, facing);
		return leftDiff;
	}

	/**
	 * @todo clean newCollisionPoint block
	 * @todo clean shifting waypoints section
	 */
	move(object: MovableGameObject, diff: number, aliveUnits: AttackableUnit[] = []) {
		//console.log('move', unit.netId, unitWaypoints[0]);

		let leftDiff = diff;
		leftDiff = this.moveForced(object, leftDiff);

		if (leftDiff > 0) {
			leftDiff = this.moveNormal(object, leftDiff, aliveUnits);
		}

		let moved = leftDiff !== diff;
		if (moved) {
			this.setNavCellFlags(object);
		}

		return moved;
	}

	isColliding(position: Vector2, radius: number, objects: MovableGameObject[]) {
		for (let j = 0, l = objects.length; j < l; j++) {
			const object2 = objects[j]!;
			if (object2.ignoreCollision)
				continue;
			if (object2.position === position)
				continue;

			const dist2 = position.distanceTo(object2.position);
			if (dist2 <= (radius + object2.collisionRadius)) {
				return object2;
			}
		}
	}

	//findClosestNotCollidingPoint(object: MovableGameObject, objects: MovableGameObject[], closestTo: Vector2) {
	//	const pointsAround = MeasureGeneral.getPointsAround(object);
	//	MeasureGeneral.sortByDistance(pointsAround, closestTo);
	//
	//	//const position = object.position;
	//	//const maxDistance = closestTo.distanceTo(position);
	//	const collisionRadius = object.collisionRadius;
	//
	//	for (let i = 0; i < pointsAround.length; i++) {
	//		const point = pointsAround[i]!;
	//
	//		//if (closestTo.distanceTo(point) > maxDistance)
	//		//	continue;
	//
	//		const collisionObject = this.isColliding(point, collisionRadius, objects);
	//		if (collisionObject)
	//			continue;
	//
	//		return point;
	//	}
	//}

	/**
	 * @todo flags like self targetable, ally targetable, enemy targetable ?
	 * @todo for better performance we could divide units array to territories
	 */
	emitEvents(object: MovableGameObject, diff: number) {

		if (object.eventEmitter.listenerCount('collisionUnit') > 0) {
			const objectPosition = object.position;
			const collisionRadius = object.collisionRadius;

			const objects = GameObjectList.attackableUnits;
			for (let j = 0, l = objects.length; j < l; j++) {
				const object2 = objects[j];

				// TODO: check why object2 may be undefined
				if (!object2)
					continue;

				if (object === object2)
					continue;

				if (!object2.position)
					continue;

				if (object2.ignoreCollision)
					continue;

				const dist2 = objectPosition.distanceTo(object2.position);
				if (dist2 <= (collisionRadius + object2.collisionRadius)) {
					object.eventEmitter.emit('collisionUnit', object2);
				}
			}
		}

		const unitWaypointsOrdered = object.moving.waypointsOrdered;
		if (unitWaypointsOrdered.length < 1) {
			const attackableUnit = object as AttackableUnit;
			if (attackableUnit.ai) {
				if (attackableUnit.issuedOrder === IssueOrderType.moveTo) {
					attackableUnit.issuedOrder = IssueOrderType.orderNone;
				}
			}
		}
	}

	sendUnitsMove(units: AttackableUnit[]) {
		const unitsToSend = units.filter(unit => {
			//if (unit.combat.isAttacking)
			//	return false;
			//if (unit.ai.subType !== AiSubType.LaneMinion)
			//	return false;

			//if (unit.combat.died)
			//	return false;
			//
			//if (unit.characterState.noRender || unit.character.neverRender)
			//	return false;
			//
			//if (unit.characterState.stealthed)
			//	return false;

			let waypoints = unit.moving.waypointsForced.length > 0 ? unit.moving.waypointsForced : unit.moving.waypoints;
			const sentWaypoints = unit.moving.sentWaypoints;

			const waypointsJson = JSON.stringify(waypoints);
			if (waypointsJson === sentWaypoints) {
				return false;
			}

			unit.moving.sentWaypoints = waypointsJson;
			return true;
		});

		sendUnitsMove(unitsToSend);
	}

	//sendUnitsMoveCollision() {
	//	const collisionWaypointsToSend = Object.values(this.collisionWaypointsToSend);
	//	if (collisionWaypointsToSend.length <= 0)
	//		return;
	//
	//	this.collisionWaypointsToSend = {};
	//
	//	const teamIds = [
	//		TeamId.chaos,
	//		TeamId.order,
	//	];
	//
	//	for (let i = 0; i < teamIds.length; i++) {
	//		const teamId = teamIds[i]!;
	//		const team = Server.teams[teamId];
	//		if (!team)
	//			continue;
	//
	//		const seenNotAllyUnits = Server.movement.lastSeenUnitsByTeam[teamId] || [];
	//		const unitsToSend = collisionWaypointsToSend.filter(([unit]) => unit.team.id === teamId || seenNotAllyUnits.includes(unit));
	//		if (unitsToSend.length < 1)
	//			continue;
	//
	//		const packet1 = packets.WaypointGroup.create({
	//			syncId: ++Server.syncId,
	//			netId: 0,
	//			movementData: unitsToSend.map(([unit, waypoint]) => ({
	//				teleportNetId: unit.netId,
	//				teleportId: 0,
	//				waypoints: [unit.position, waypoint, ...unit.moving.waypoints],
	//			})),
	//		});
	//		team.sendPacket(packet1, loadingStages.inGame);
	//		//unitsToSend.forEach(([unit, waypoint]) => {
	//		//	unit.moving.sentWaypoints = [];
	//		//});
	//	}
	//}

	resolveCollision(object: (Collidable & Pathable), obstacles: (Collidable & Pathable)[]) {
		const needPathfinding = resolveCollision(object, obstacles);
		if (!needPathfinding)
			return;

		const pathfindingTime = object.pathfindingTime;
		const now = performance.now();
		if (!pathfindingTime && pathfindingTime > now - 1000)
			return;
		object.pathfindingTime = now;

		const waypoints = object.waypoints;
		const position = object.position;
		const collisionRadius = object.collisionRadius;
		const collisionGroup = object.collisionGroup;
		const premovePosition = object.premovePosition!;
		const destination = object.destination;

		const obstacles2 = obstacles.filter(v => v.collisionGroup === collisionGroup);//.filter(v => !v.isMoving);
		const distance = position.distanceTo(premovePosition);
		const obstacles3 = filterInRange(object, obstacles2, distance * 3);

		// collisionRadius - 1 because movement "jumps" and path finding does not
		const path = findPathAroundObstacles(premovePosition, destination, collisionRadius - 1, obstacles3);
		waypoints.splice(0);
		//object.resolvedWaypoints = [];

		if (path && path.length > 0) {
			waypoints.push(...path.map(v => Vector2.from(v)));
			//object.resolvedWaypoints = path.map(v => Vector2.from(v));

			const dir = Vector2.from(path[0]!).sub(premovePosition).normalize();
			if (!dir.isZero()) {
				const pathCandidate = premovePosition.clone().add(dir.multiplyScalar(distance));
				if (!isColliding(pathCandidate, collisionRadius, obstacles, position)) {
					position.copy(pathCandidate);
				}
			}
		}
	}

	/**
	 * Movement main loop for units to make them move on server side
	 */
	update(diff: number, updateTime: number) {
		const units = GameObjectList.aliveUnits;
		this.sendUnitsMove(units);

		const collidableUnits = units.filter(unit => !unit.ignoreCollision
			&& unit.ai.type !== AiType.Building
			&& unit.ai.type !== AiType.Hero)
			.map(v => v.moving);

		const movedUnits = units.filter(unit => {
			//if (unit.combat.isAttacking)
			//	return false;

			const moved = this.move(unit, diff, units);
			unit.moving.isMoving = moved;
			if (moved) {
				this.resolveCollision(unit.moving, collidableUnits);
			}
			return moved;
		});

		//this.sendUnitsMoveCollision();

		const missiles = GameObjectList.missiles;
		const movedMissiles = missiles.filter(missile => {
			//todo: flags like collidable with terrain, with ally units, with enemy units
			const moved = this.move(missile, diff);
			return moved;
		});

		this.visionProcess(units, updateTime);

		movedUnits.forEach((unit) => {
			this.emitEvents(unit, diff);
		});
		movedMissiles.forEach((missile) => {
			this.emitEvents(missile, diff);
		});
	}

	async start() {
		const diff = Server.gameLoop.delay;
		Server.gameLoop.add((updateTime) => this.update(diff, updateTime));
	}
}
