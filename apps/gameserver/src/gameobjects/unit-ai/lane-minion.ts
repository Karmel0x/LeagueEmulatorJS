
import { type Vector2 } from '@repo/geometry';
import type { PacketMessage } from '@repo/network/packets/packet';
import type { MinionType } from '@repo/packets/base/s2c/0x03-Barrack_SpawnUnit';
import type Character from '@repo/scripting/base/character';
import Server from '../../app/server';
import { EventEmitter2 } from '../../core/event-emitter2';
import { TeamId, type LaneId } from '../../gameobjectextensions/traits/team';
import type Barrack from '../spawners/barrack';
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

		owner.eventEmitter.on('noTargetsInRange', () => {
			this.moveLane();
		});

		super.pinEvents();
	}

	onSpawnPackets(to: (packet: PacketMessage | undefined) => void) {
		const owner = this.owner;

		const spawner = owner.spawner as Barrack;
		spawner.spawnUnitAns(owner.netId, this.options.minionType, to);

		const health = owner.stats.health;
		if (health.current < health.total)
			owner.packets.OnEnterLocalVisibilityClient(to);
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

		const interval2 = setInterval(() => {
			if (owner.combat.died)
				return;

			const lanePath = this.lanePath;
			if (!lanePath)
				return;

			const nextLanePoint = lanePath[0];
			if (!nextLanePoint)
				return;

			const distanceToNextPoint = owner.position.distanceTo(nextLanePoint);
			if (distanceToNextPoint >= 300)
				return;

			lanePath.shift();

			if (lanePath !== owner.moving.waypoints)
				return;

			owner.moving.moveAns(lanePath.slice(0, 2));
		}, 250);

		owner.eventEmitter.once('death', () => {
			clearInterval(interval2);
		});

		super.onSpawn();
	}

	/**
	 * Set waypoints for the unit to pathing
	 */
	moveLane(teamId: TeamId | undefined = undefined, laneId: LaneId | undefined = undefined) {
		const owner = this.owner;

		if (this.lanePath) {
			owner.moving.setWaypoints(this.lanePath);
			return;
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
		//lanePath = Measure.general.getFromNearestToEnd(owner, lanePath);
		//
		////@todo make path more precise
		//if (lanePath.length > 1)
		//	lanePath.shift();

		owner.moving.setWaypoints(lanePath);
		this.lanePath = lanePath;
	}

	/**
	 * @todo shall return spawner level
	 */
	get level() {
		return 1;
	}

	get characterBase() {
		const character = this.owner.character;
		return character?.constructor as typeof Character | undefined;
	}

}
