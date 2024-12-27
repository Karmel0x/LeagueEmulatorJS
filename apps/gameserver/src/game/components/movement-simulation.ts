import { IssueOrderType } from '@repo/packets/base/c2s/0x72-IssueOrderReq';
import GameObjectList from '../../app/game-object-list';
import Server from '../../app/server';
import { runAccurateInterval } from '../../core/timer';
import { TeamId } from '../../gameobjects/extensions/traits/team';
import type MovableGameObject from '../../gameobjects/movable-game-object';
import type AttackableUnit from '../../gameobjects/units/attackable-unit';

// https://leagueoflegends.fandom.com/wiki/Sight#Sight_Ranges
const defaultVisionRange = 1350;

/**
 * @todo a lot of stuff to create here
 * and a lot of stuff to improve here
 * maybe move this to IMovable ?
 */
export default class MovementSimulation {

	static moveInterval = 33;// ~30hz

	//Map = new Vector2(14000, 14000);

	lastSeenUnitsByTeam: { [n: number]: AttackableUnit[]; } = {};

	/**
	 * Checks if unit is visible for enemy and broadcasting it
	 * @todo only process units that moved ?
	 * @todo improve loop to not repeat same unit pairs
	 */
	visionProcess() {
		const seenUnitsByTeam: { [n: number]: AttackableUnit[]; } = {};
		GameObjectList.aliveUnits.forEach(unit => {
			if (unit.team.id === TeamId.neutral)
				return;

			if (unit.combat.died)
				return;

			const unitTeamId = unit.team.id;
			const unitPosition = unit.position;
			const unitVisionRange = unit.visionRange || defaultVisionRange;

			const seenUnits = seenUnitsByTeam[unitTeamId] || [];
			seenUnitsByTeam[unitTeamId] = seenUnits;

			GameObjectList.aliveUnits.forEach(unit2 => {
				if (unitTeamId === unit2.team.id)
					return;

				if (unit2.combat.died)
					return;

				if (unitPosition.distanceTo(unit2.position) > unitVisionRange)
					return;

				if (seenUnits.includes(unit2))
					return;

				seenUnits.push(unit2);
			});
		});

		// leaves the vision
		for (const teamId in this.lastSeenUnitsByTeam) {
			const teamUnits = this.lastSeenUnitsByTeam[teamId]!;

			const team = Server.teams[teamId];
			if (!team)
				continue;

			const seenUnits = seenUnitsByTeam[teamId] || [];
			seenUnitsByTeam[teamId] = seenUnits;

			teamUnits.forEach(unit => {
				if (seenUnits.includes(unit))
					return;

				if (unit.combat.died)
					return;

				team.vision(unit, false);
			});
		}

		// enters the vision
		for (const teamId in seenUnitsByTeam) {
			const teamUnits = seenUnitsByTeam[teamId]!;

			const team = Server.teams[teamId];
			if (!team)
				continue;

			const lastSeenUnits = this.lastSeenUnitsByTeam[teamId] || [];
			this.lastSeenUnitsByTeam[teamId] = lastSeenUnits;

			teamUnits.forEach(unit => {
				if (lastSeenUnits.includes(unit))
					return;

				team.vision(unit, true);
			});
		}

		this.lastSeenUnitsByTeam = seenUnitsByTeam;
	}

	/**
	 * Actually move unit  
	 * returns {boolean} hasMoved
	 */
	move(object: MovableGameObject, diff: number) {
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
	emitEvents(object: MovableGameObject, diff: number) {

		// @todo missiles only
		if (object.eventEmitter.listenerCount('collision') > 0) {
			const objectPosition = object.position;
			const collisionRadius = object.collisionRadius;

			const objects = GameObjectList.objects;
			for (let j = 0, l = objects.length; j < l; j++) {
				const object2 = objects[j];

				//TODO
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
					object.eventEmitter.emit('collision', object2);
				}
			}
		}

		const unitWaypoints = object.moving.waypoints;
		if (unitWaypoints.length < 1) {
			object.eventEmitter.emit('reachDestination');

			const attackableUnit = object as AttackableUnit;
			if (attackableUnit.ai) {
				if (attackableUnit.issuedOrder === IssueOrderType.moveTo)
					attackableUnit.issuedOrder = IssueOrderType.orderNone;

			}
		}
	}

	moved: { [n: number]: boolean; } = {};

	/**
	 * Movement main loop for units to make them move on server side
	 */
	async update(diff: number) {
		this.moved = {};

		const units = GameObjectList.aliveUnits;
		units.forEach(unit => {
			const moved = this.move(unit, diff);
			if (moved)
				this.emitEvents(unit, diff);
			this.moved[unit.netId] = moved;
		});

		const missiles = GameObjectList.missiles;
		missiles.forEach(missile => {
			//todo: flags like collidable with terrain, with ally units, with enemy units
			const moved = this.move(missile, diff);
			if (moved)
				this.emitEvents(missile, diff);
			//this.moved[missile.netId] = moved;
		});

		this.visionProcess();
	}

	async start() {
		runAccurateInterval((diff) => this.update(diff), MovementSimulation.moveInterval);
	}
}
