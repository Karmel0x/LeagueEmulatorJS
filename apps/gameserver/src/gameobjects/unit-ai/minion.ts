import type { PacketMessage } from '@repo/network/packets/packet';
import { IssueOrderType } from '@repo/packets/base/c2s/0x72-IssueOrderReq';
import type { MinionType } from '@repo/packets/base/s2c/0x03-Barrack_SpawnUnit';
import * as packets from '@repo/packets/list';
import type Character from '@repo/scripting/base/character';
import GameObjectList from '../../app/game-object-list';
import Server from '../../app/server';
import { EventEmitter2 } from '../../core/event-emitter2';
import * as Measure from '../../gameobjectextensions/measure';
import { type LaneId, TeamId } from '../../gameobjectextensions/traits/team';
import type Barrack from '../spawners/barrack';
import type AttackableUnit from '../units/attackable-unit';
import type { AttackableUnitOptions } from '../units/attackable-unit';
import BaseAi, { type BaseAiEvents, type BaseAiOptions } from './base-ai';
import Player from './player';
import { AiSubType, AiType } from './types';

export type MinionOptions = BaseAiOptions & {
	spawner: Barrack;
	minionType: MinionType;
};

export type MinionEvents = BaseAiEvents & {

};

export default class Minion extends BaseAi {
	static initialize(options: MinionOptions) {
		return super.initialize(options) as Minion;
	}

	static initializeUnit(unitOptions: AttackableUnitOptions, aiOptions: Omit<MinionOptions, 'owner'>) {
		return super.initializeUnit(unitOptions, aiOptions);
	}

	readonly eventEmitter = new EventEmitter2<MinionEvents>();

	declare options: MinionOptions;
	type = AiType.Minion;
	subType = AiSubType.LaneMinion;

	constructor(options: MinionOptions) {
		super(options);
	}

	loader(options: MinionOptions) {
		this.owner.issuedOrder = IssueOrderType.attackMove;

		super.loader(options);
		this.pinEvents();
	}

	pinEvents() {
		const owner = this.owner;

		owner.eventEmitter.on('death', (source, assists) => this.onDie(source, assists));
		owner.eventEmitter.on('spawn', () => this.onSpawn());

		owner.eventEmitter.on('setWaypoints', () => {
			this.stopAttack();
		});

		owner.eventEmitter.on('noTargetsInRange', () => {
			this.stopAttack();
			this.moveLane();
		});
	}

	stopAttack() {
		const owner = this.owner;
		const packet1 = packets.InstantStop_Attack.create({
			netId: owner.netId,
			keepAnimating: true,
			destroyMissile: false,
		});
		owner.packets.toEveryone(packet1);
	}

	onSpawnPackets(to: (packet: PacketMessage | undefined) => void) {
		const owner = this.owner;
		const spawner = owner.spawner as Barrack;

		if (spawner && owner.character)
			spawner.spawnUnitAns(owner.netId, this.options.minionType, to);

		const health = owner.stats.health;
		if (health.current < health.total)
			owner.packets.OnEnterLocalVisibilityClient(to);
	}

	onSpawn() {
		this.onSpawnPackets((packet) => Server.teams[TeamId.all]?.sendPacket(packet));
	}

	/**
	 * Set waypoints for the unit to pathing
	 */
	moveLane(teamId: TeamId | undefined = undefined, laneId: LaneId | undefined = undefined) {
		const owner = this.owner;
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
		lanePath = Measure.general.getFromNearestToEnd(owner, lanePath);

		//@todo make path more precise
		if (lanePath.length > 1)
			lanePath.shift();

		owner.moving.setWaypoints(lanePath);
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

	get rewardExp() {
		const character = this.owner.character;
		return 0;
	}

	get rewardGold() {
		const character = this.owner.character;
		return 0;
	}

	onDieRewards(source: AttackableUnit, assists: AttackableUnit[]) {
		const owner = this.owner;
		console.log('onDieRewards', source.team.id, owner.team.id, source.type);
		// make sure once again if we should reward killer
		if (source.team.id === owner.team.id)
			return;

		const range = Server.map.constants.dieExpRadius;
		const thisUnitTeamId = owner.team.id;
		const enemyUnitsInRange = GameObjectList.aliveUnits.filter(unit => unit.team.id !== thisUnitTeamId && unit.position.distanceTo(owner.position) <= range);
		const enemyPlayersInRange = enemyUnitsInRange.filter(v => v.ai instanceof Player && v !== source);

		let numberOfPlayersToSplitExp = enemyPlayersInRange.length;
		if (source.ai instanceof Player)
			numberOfPlayersToSplitExp += 1;

		let rewardExp = this.rewardExp;
		if (numberOfPlayersToSplitExp <= 1)
			rewardExp *= 0.92;//PlayerMinionSplitXP1
		else
			rewardExp *= 1.1;//PlayerMinionSplitXP2 * 2

		rewardExp /= numberOfPlayersToSplitExp;

		// give gold and exp to killer no matter if in range
		if (source.ai instanceof Player) {
			source.progress.expUp(rewardExp);
			source.progress.goldUp(this.rewardGold, owner);
		}

		// give exp to nearby enemies
		enemyPlayersInRange.forEach(enemyUnit => {
			enemyUnit.progress.expUp(rewardExp);
		});
	}

	onDie(source: AttackableUnit, assists: AttackableUnit[]) {
		this.onDieRewards(source, assists);
	}

}
