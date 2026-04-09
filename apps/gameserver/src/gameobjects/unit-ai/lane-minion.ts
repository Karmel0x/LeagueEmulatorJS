
import { type Vector2 } from '@repo/geometry';
import type { PacketMessage } from '@repo/network/packets/packet';
import { MinionType } from '@repo/packets/base/s2c/0x03-Barrack_SpawnUnit';
import type Character from '@repo/scripting/base/character';
import Server from '../../app/server';
import { EventEmitter2 } from '../../core/event-emitter2';
import { TeamId, type LaneId } from '../../gameobjectextensions/traits/team';
import type Barrack from '../spawners/barrack';
import type AttackableUnit from '../units/attackable-unit';
import Minion, { type MinionAttackableUnitOptions, type MinionEvents, type MinionOptions } from './minion';
import { AiSubType, AiType } from './types';

export type LaneMinionAttackableUnitOptions = MinionAttackableUnitOptions & {
	spawner: Barrack;
};

export type LaneMinionOptions = MinionOptions & {
	minionType: MinionType;
};

export type LaneMinionEvents = MinionEvents & {

};

export default class LaneMinion extends Minion {
	static initialize(options: LaneMinionOptions) {
		return super.initialize(options) as LaneMinion;
	}

	static initializeUnit(unitOptions: LaneMinionAttackableUnitOptions, aiOptions: Omit<LaneMinionOptions, 'owner'>) {
		return super.initializeUnit(unitOptions, aiOptions);
	}

	readonly eventEmitter = new EventEmitter2<LaneMinionEvents>();

	declare options: LaneMinionOptions;
	type = AiType.Minion;
	subType = AiSubType.LaneMinion;

	lanePath?: Vector2[] = undefined;
	isHardResettingInProgress = false;

	constructor(options: LaneMinionOptions) {
		super(options);
	}

	loader(options: LaneMinionOptions) {
		super.loader(options);
	}

	pinEvents() {
		const owner = this.owner;

		owner.eventEmitter.on('setWaypoints', () => {
			this.stopAttack();
		});

		super.pinEvents();
	}

	onSpawnPackets() {
		const spawnPackets: (PacketMessage | undefined)[] = [];
		const owner = this.owner;

		if (owner.characterState.noRender || owner.character.neverRender)
			return spawnPackets;

		const spawner = owner.spawner as Barrack;
		const packet1 = spawner.spawnUnitAns(owner.netId, this.options.minionType);
		spawnPackets.push(packet1);

		const health = owner.stats.health;
		if (health.current < health.total) {
			const packet2 = owner.packets.OnEnterLocalVisibilityClient();
			spawnPackets.push(packet2);
		}

		return spawnPackets;
	}

	//callToNextLanePoint() {
	//	if (!this.nextLanePoint)
	//		return;
	//
	//	const owner = this.owner;
	//	owner.combat.acquisitionManual = undefined;
	//	owner.moving.setWaypoints([new Vector2(this.nextLanePoint.x, this.nextLanePoint.y)]);
	//}
	//
	//hardReset() {
	//	if (this.isHardResettingInProgress)
	//		return;
	//	if (!this.nextLanePoint)
	//		return;
	//
	//	this.isHardResettingInProgress = true;
	//
	//	const owner = this.owner;
	//	owner.combat.autoAttackToggle = false;
	//	this.callToNextLanePoint();
	//
	//	const interval1 = setInterval(() => {
	//		if (owner.combat.died)
	//			return;
	//
	//		if (owner.position.distanceTo(this.nextLanePoint!) > 400)
	//			return;
	//
	//		owner.combat.autoAttackToggle = true;
	//		clearInterval(interval1);
	//		this.isHardResettingInProgress = false;
	//	}, 250);
	//}
	//
	//softReset() {
	//	this.callToNextLanePoint();
	//}

	onSpawn() {
		const owner = this.owner;

		// TODO: minion leashing protection but need more precise lane points or use leash point
		//let softResetsDetected = 0;
		//const interval1 = setInterval(() => {
		//	if (owner.combat.died)
		//		return;
		//	if (!this.nextLanePoint)
		//		return;
		//
		//	// TODO: if distance > 750 then find new target
		//	if (owner.position.distanceTo(this.nextLanePoint) <= 850)
		//		return;
		//
		//	if (softResetsDetected > 3) {
		//		this.hardReset();
		//		softResetsDetected = 0;
		//	}
		//	else {
		//		this.softReset();
		//		softResetsDetected++;
		//	}
		//}, 250);
		//
		//owner.eventEmitter.once('death', () => {
		//	clearInterval(interval1);
		//});

		let lastTarget: AttackableUnit | undefined = undefined;

		const interval2 = setInterval(() => {
			if (owner.combat.died) {
				clearInterval(interval2);
				return;
			}

			//const currentTarget = owner.combat.attackTarget;
			//if (currentTarget)
			//	return;

			const target = owner.combat.findNewTargetInAcR();
			if (target) {
				if (lastTarget !== target) {
					lastTarget = target;
					owner.combat.startAttackAndFollow(target);
				}
			}
			else {
				this.moveNextLanePoint();
			}
		}, 250);

		super.onSpawn();
	}

	/**
	 * Set waypoints for the unit to pathing
	 */
	getLanePath(teamId: TeamId | undefined = undefined, laneId: LaneId | undefined = undefined) {
		const owner = this.owner;

		if (this.lanePath) {
			return this.lanePath;
		}

		const spawner = owner.spawner as Barrack;
		//console.log('moveLane', this.constructor.name, owner.netId);

		teamId = teamId ?? spawner.team.id;
		laneId = laneId ?? spawner.lane;

		if (teamId === undefined || laneId === undefined)
			return;

		const { minionLanePaths } = Server.map.positions;
		const minionLanePath = minionLanePaths[teamId as keyof typeof minionLanePaths]?.[laneId];
		if (!minionLanePath)
			return;

		let lanePath = minionLanePath.map(a => a.clone());
		lanePath.shift();

		this.lanePath = lanePath;
		return lanePath;
	}

	moveNextLanePoint() {
		const owner = this.owner;

		let lanePath = this.getLanePath();
		if (!lanePath)
			return;

		let nextLanePoint = lanePath[0];
		if (nextLanePoint) {
			const distanceToNextPoint = owner.position.distanceTo(nextLanePoint);
			if (distanceToNextPoint < 300) {
				lanePath.shift();
				nextLanePoint = lanePath[0];
			}
		}

		if (!nextLanePoint)
			return;

		const waypointsOrdered = owner.moving.waypointsOrdered;
		if (waypointsOrdered[0] === nextLanePoint)
			return;

		owner.moving.setWaypoints([nextLanePoint]);
	}

	get characterBase() {
		const character = this.owner.character;
		return character?.constructor as typeof Character | undefined;
	}

}
