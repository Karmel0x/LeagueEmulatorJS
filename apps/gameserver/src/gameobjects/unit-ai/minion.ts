import type { PacketMessage } from '@repo/network/packets/packet';
import { IssueOrderType } from '@repo/packets/base/c2s/0x72-IssueOrderReq';
import * as packets from '@repo/packets/list';
import type Character from '@repo/scripting/base/character';
import GameObjectList from '../../app/game-object-list';
import Server from '../../app/server';
import UnitAiList from '../../app/unit-ai-list';
import { EventEmitter2 } from '../../core/event-emitter2';
import { numberBetween } from '../../core/utils';
import { TeamId } from '../../gameobjectextensions/traits/team';
import type AttackableUnit from '../units/attackable-unit';
import type { AttackableUnitOptions } from '../units/attackable-unit';
import BaseAi, { type BaseAiEvents, type BaseAiOptions } from './base-ai';
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

		// TODO: destroy object on death
		owner.eventEmitter.on('death', (source, assists) => this.onDie(source, assists));
		owner.eventEmitter.on('spawn', () => this.onSpawn());

		owner.eventEmitter.on('attackTargetChange', (target) => {
			if (target)
				return;

			this.stopAttack();
		});
	}

	stopAttack() {
		const owner = this.owner;
		if (owner.characterState.noRender || owner.character.neverRender)
			return;

		const packet1 = packets.InstantStop_Attack.create({
			netId: owner.netId,
			keepAnimating: true,
			destroyMissile: false,
		});
		owner.packets.toEveryone(packet1);
	}

	onSpawnPackets() {
		const spawnPackets: (PacketMessage | undefined)[] = [];
		const owner = this.owner;

		// it has to be on neverRender but TODO: check if it should be on noRender here
		if (owner.characterState.noRender || owner.character.neverRender)
			return spawnPackets;

		const packet1 = packets.SpawnMinion.create({
			netId: 0,
			objectNetId: owner.netId,
			netNodeId: 0x40,
			position: owner.position,
			skinId: 0,
			cloneNetId: 0,
			team: owner.team.id,
			visibilitySize: owner.stats.visibilitySize.total,
			ignoreCollision: owner.ignoreCollision,
			isWard: false,
			//isLaneMinion: true,
			name: owner.name,
			skinName: owner.character.name,
		});
		spawnPackets.push(packet1);

		const health = owner.stats.health;
		if (health.current < health.total) {
			const packet2 = owner.packets.OnEnterLocalVisibilityClient();
			spawnPackets.push(packet2);
		}

		return spawnPackets;
	}

	onSpawn() {
		const packets = this.onSpawnPackets();
		Server.teams[TeamId.all]?.sendPacket(packets);
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
		return character?.expGivenOnDeath || 0;
	}

	get rewardGold() {
		const character = this.owner.character;
		return character?.goldGivenOnDeath || 0;
	}

	get rewardGlobalExp() {
		const character = this.owner.character;
		return character?.globalExpGivenOnDeath || 0;
	}

	get rewardGlobalGold() {
		const character = this.owner.character;
		return character?.globalGoldGivenOnDeath || 0;
	}

	get expRadius() {
		const range = Server.map.constants.dieExpRadius;
		return range as number;
	}

	onDieRewards(source: AttackableUnit, assists: AttackableUnit[]) {
		const owner = this.owner;
		const thisUnitTeamId = owner.team.id;
		console.log('onDieRewards', source.team.id, thisUnitTeamId, source.type);
		// make sure once again if we should reward killer
		if (source.team.id === thisUnitTeamId)
			return;

		let rewardExp = this.rewardExp;
		let rewardGold = this.rewardGold;
		if (rewardExp || rewardGold) {
			const range = this.expRadius;
			const enemyUnitsInRange = GameObjectList.aliveUnits.filter(unit => unit.team.id !== thisUnitTeamId && unit.team.id !== TeamId.neutral && unit.position.distanceTo(owner.position) <= range);
			const enemyPlayersInRange = enemyUnitsInRange.filter(v => v.ai.type === AiType.Hero && v !== source);

			let numberOfPlayersToSplitExp = enemyPlayersInRange.length;
			if (source.ai.type === AiType.Hero)
				numberOfPlayersToSplitExp += 1;

			if (numberOfPlayersToSplitExp > 0) {
				const experienceSplit = Server.map.mission.experienceSplit;
				const rewardExpSplitted = rewardExp * experienceSplit[numberBetween(numberOfPlayersToSplitExp - 1, 0, experienceSplit.length)]!;

				// give gold and exp to killer no matter if in range
				if (source.ai.type === AiType.Hero) {
					source.progress.expUp(rewardExpSplitted);
					source.progress.goldUp(rewardGold, owner);
				}

				// give exp to nearby enemies
				enemyPlayersInRange.forEach(enemyUnit => {
					enemyUnit.progress.expUp(rewardExpSplitted);
				});
			}
		}

		let rewardGlobalExp = this.rewardGlobalExp;
		let rewardGlobalGold = this.rewardGlobalGold;
		if (rewardGlobalExp || rewardGlobalGold) {
			const heroes = UnitAiList.heroes;
			const teamHeroes = heroes.filter(ai => ai.owner.team.id !== thisUnitTeamId);
			const teamHeroUnits = teamHeroes.map(ai => ai.owner);

			for (let i = 0; i < teamHeroUnits.length; i++) {
				const unit = teamHeroUnits[i]!;
				unit.progress.expUp(rewardGlobalExp);
				unit.progress.goldUp(rewardGlobalGold);
			}
		}
	}

	onDie(source: AttackableUnit, assists: AttackableUnit[]) {
		this.onDieRewards(source, assists);
	}

}
