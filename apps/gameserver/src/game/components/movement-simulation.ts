import Server from '../../app/server';
import { IMovingGameObject } from '../../gameobjects/extensions/moving/game-object';
import { TeamId } from '../../gameobjects/extensions/traits/team';
import GameObjectList from '../../app/game-object-list';
import type AttackableUnit from '../../gameobjects/units/attackable-unit';

// https://leagueoflegends.fandom.com/wiki/Sight#Sight_Ranges
const defaultVisionRange = 1350;

/**
 * @todo a lot of stuff to create here
 * and a lot of stuff to improve here
 * maybe move this to IMovable ?
 */
export default class MovementSimulation {

	static moveInterval = 20;//lower this?

	//Map = new Vector2(14000, 14000);

	lastSeenUnitsByTeam: { [n: number]: AttackableUnit[]; } = {};

	/**
	 * Checks if unit is visible for enemy and broadcasting it
	 * @todo only process units that moved ?
	 */
	visionProcess() {
		let seenUnitsByTeam: { [n: number]: AttackableUnit[]; } = {};
		GameObjectList.aliveUnits.forEach(unit => {
			if (unit.team.id == TeamId.neutral)
				return;

			if (unit.combat.died)
				return;

			let unitTeamId = unit.team.id;
			let unitPosition = unit.position;
			let unitVisionRange = unit.visionRange || defaultVisionRange;

			seenUnitsByTeam[unitTeamId] = seenUnitsByTeam[unitTeamId] || [];

			GameObjectList.aliveUnits.forEach(unit2 => {
				if (unitTeamId == unit2.team.id)
					return;

				if (unit2.combat.died)
					return;

				if (unitPosition.distanceTo(unit2.position) > unitVisionRange)
					return;

				if (seenUnitsByTeam[unitTeamId].includes(unit2))
					return;

				seenUnitsByTeam[unitTeamId].push(unit2);
			});
		});

		// leaves the vision
		for (let teamId in this.lastSeenUnitsByTeam) {
			let teamUnits = this.lastSeenUnitsByTeam[teamId];

			if (!Server.teams[teamId])
				continue;

			seenUnitsByTeam[teamId] = seenUnitsByTeam[teamId] || [];

			teamUnits.forEach(unit => {
				if (seenUnitsByTeam[teamId].includes(unit))
					return;

				Server.teams[teamId].vision(unit, false);
			});
		}

		// enters the vision
		for (let teamId in seenUnitsByTeam) {
			let teamUnits = seenUnitsByTeam[teamId];

			if (!Server.teams[teamId])
				continue;

			this.lastSeenUnitsByTeam[teamId] = this.lastSeenUnitsByTeam[teamId] || [];

			teamUnits.forEach(unit => {
				if (this.lastSeenUnitsByTeam[teamId].includes(unit))
					return;

				Server.teams[teamId].vision(unit, true);
			});
		}

		this.lastSeenUnitsByTeam = seenUnitsByTeam;
	}

	/**
	 * Actually move unit  
	 * returns {boolean} hasMoved
	 */
	move(object: IMovingGameObject, diff: number) {
		//if (unit.waypointsHalt)
		//	return false;

		//console.log('move', unit.netId, unitWaypoints[0]);

		let unitWaypoints = object.moving.waypoints;
		if (!unitWaypoints)
			return false;

		object.moving.sendWaypoints(unitWaypoints);

		let nextWaypoint = unitWaypoints[0];
		if (!nextWaypoint)
			return false;

		let objectPosition = object.position;

		let moveSpeed = (object.moving.speedParams?.pathSpeedOverride || object.stats.moveSpeed.total) / 1000;
		let moveDistance = moveSpeed * diff;

		let remainingDistance = moveDistance;
		let nextWaypointDistance = objectPosition.distanceTo(nextWaypoint);

		if (remainingDistance >= nextWaypointDistance) {
			objectPosition.copy(nextWaypoint);
			unitWaypoints.shift();
			nextWaypoint = unitWaypoints[0];
			remainingDistance -= nextWaypointDistance;
		}

		if (!nextWaypoint || remainingDistance <= 0)
			return true;

		let direction = nextWaypoint.clone().sub(objectPosition).normalize();
		objectPosition.add(direction.multiplyScalar(remainingDistance));
		return true;
	}

	/**
	 * @todo flags like self targetable, ally targetable, enemy targetable ?
	 * @todo for better performance we could divide units array to territories
	 */
	emitEvents(object: IMovingGameObject, diff: number) {

		let unitWaypoints = object.moving.waypoints;
		if (unitWaypoints.length < 1) {
			object.eventEmitter.emit('reachDestination');
		}

		if (object.eventEmitter.listenerCount('collision') < 1)
			return;

		let objectPosition = object.position;
		let collisionRadius = object.collisionRadius;

		let objects = GameObjectList.objects;
		for (let j = 0, l = objects.length; j < l; j++) {
			let object2 = objects[j];

			//@todo
			if (!object2)
				continue;

			if (!object2.position)
				continue;

			let dist2 = objectPosition.distanceTo(object2.position);
			if (dist2 <= (collisionRadius + object2.collisionRadius)) {
				object.eventEmitter.emit('collision', object2);
			}
		}
	}

	/**
	 * Get unit elapsed time in ms since last movement update
	 */
	objectMoveDiff(object: IMovingGameObject) {
		let now = performance.now();
		if (!object.moving.moveTime) {
			object.moving.moveTime = now;
			return 0;
		}

		let diff = now - object.moving.moveTime;
		object.moving.moveTime = now;
		return diff;
	}

	moved: { [n: number]: boolean; } = {};

	/**
	 * Movement main loop for units to make them move on server side
	 */
	async update() {
		for (; ;) {
			await Promise.delay(MovementSimulation.moveInterval);
			this.moved = {};

			// @todo: get only movable units
			let units = GameObjectList.aliveUnits;
			units.forEach(unit => {
				if (!unit.moving)
					return;

				let diff = this.objectMoveDiff(unit);
				let moved = this.move(unit, diff);
				if (moved)
					this.emitEvents(unit, diff);
				this.moved[unit.netId] = moved;
			});

			let missiles = GameObjectList.missiles;
			missiles.forEach(missile => {
				//if (!missile.moving)
				//	return;

				let diff = this.objectMoveDiff(missile);
				//todo: flags like collidable with terrain, with ally units, with enemy units
				let moved = this.move(missile, diff);
				if (moved)
					this.emitEvents(missile, diff);
				//this.moved[missile.netId] = moved;
			});

			this.visionProcess();

		}
	}
	async start() {

		this.update();
	}
}
