import type { PacketMessage } from '@repo/network/packets/packet';
import { IssueOrderType } from '@repo/packets/base/c2s/0x72-IssueOrderReq';
import * as packets from '@repo/packets/list';
import type Character from '@repo/scripting/base/character';
import GameObjectList from '../../app/game-object-list';
import Server from '../../app/server';
import { EventEmitter2 } from '../../core/event-emitter2';
import { TeamId } from '../../gameobjectextensions/traits/team';
import type AttackableUnit from '../units/attackable-unit';
import type { AttackableUnitOptions } from '../units/attackable-unit';
import BaseAi, { type BaseAiEvents, type BaseAiOptions } from './base-ai';
import Hero from './hero';
import { AiSubType, AiType } from './types';

export type MinionAttackableUnitOptions = AttackableUnitOptions & {
	//spawner?: JungleCamp | Barrack | AttackableUnit;
};

export type MinionOptions = BaseAiOptions & {

};

export type MinionEvents = BaseAiEvents & {

};

export default class Minion extends BaseAi {
	static initialize(options: MinionOptions) {
		return super.initialize(options) as Minion;
	}

	static initializeUnit(unitOptions: MinionAttackableUnitOptions, aiOptions: Omit<MinionOptions, 'owner'>) {
		return super.initializeUnit(unitOptions, aiOptions);
	}

	readonly eventEmitter = new EventEmitter2<MinionEvents>();

	declare options: MinionOptions;
	type = AiType.Minion;
	subType = AiSubType.BaseMinion;

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

		owner.eventEmitter.on('noTargetsInRange', () => {
			this.stopAttack();
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

		const packet1 = packets.SpawnMinion.create({
			netId: 0,
			objectNetId: owner.netId,
			netNodeId: 0x40,
			position: owner.position,
			skinId: 0,
			cloneNetId: 0,
			team: owner.team.id,
			visibilitySize: owner.stats.collisionRadius.total,
			ignoreCollision: owner.ignoreCollision,
			isWard: false,
			name: owner.name,
			skinName: owner.character.name,
		});
		to(packet1);

		const health = owner.stats.health;
		if (health.current < health.total)
			owner.packets.OnEnterLocalVisibilityClient(to);
	}

	onSpawn() {
		this.onSpawnPackets((packet) => Server.teams[TeamId.all]?.sendPacket(packet));
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
		const thisUnitTeamId = owner.team.id;
		console.log('onDieRewards', source.team.id, thisUnitTeamId, source.type);
		// make sure once again if we should reward killer
		if (source.team.id === thisUnitTeamId)
			return;

		const range = Server.map.constants.dieExpRadius;
		const enemyUnitsInRange = GameObjectList.aliveUnits.filter(unit => unit.team.id !== thisUnitTeamId && unit.position.distanceTo(owner.position) <= range);
		const enemyPlayersInRange = enemyUnitsInRange.filter(v => v.ai instanceof Hero && v !== source);

		let numberOfPlayersToSplitExp = enemyPlayersInRange.length;
		if (source.ai instanceof Hero)
			numberOfPlayersToSplitExp += 1;

		let rewardExp = this.rewardExp;
		if (numberOfPlayersToSplitExp <= 1)
			rewardExp *= 0.92;//PlayerMinionSplitXP1
		else
			rewardExp *= 1.1;//PlayerMinionSplitXP2 * 2

		rewardExp /= numberOfPlayersToSplitExp;

		// give gold and exp to killer no matter if in range
		if (source.ai instanceof Hero) {
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
