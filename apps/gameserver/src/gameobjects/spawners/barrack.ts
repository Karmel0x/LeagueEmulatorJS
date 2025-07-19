
import type { PacketMessage } from '@repo/network/packets/packet';
import { MinionType } from '@repo/packets/base/s2c/0x03-Barrack_SpawnUnit';
import * as packets from '@repo/packets/list';
import type { NetId } from '@repo/packets/types/player';
import Server from '../../app/server';
import UnitAiList from '../../app/unit-ai-list';
import { accurateDelay, runAccurateInterval } from '../../core/timer';
import { delay } from '../../core/utils';
import { TeamId, type LaneId } from '../extensions/traits/team';
import { barracks } from '../positions/index';
import Minion, { type MinionOptions } from '../unit-ai/minion';
import AttackableUnit, { type AttackableUnitOptions } from '../units/attackable-unit';
import Spawner, { type SpawnerOptions } from './spawner';


export type BarrackOptions = SpawnerOptions & {
	lane: LaneId;
};

const minionNames = {
	[MinionType.melee]: 'Basic',
	[MinionType.caster]: 'Wizard',
	[MinionType.cannon]: 'MechCannon',
	[MinionType.super]: 'MechMelee',
} as const;

/**
 * minion spawner
 */
export default class Barrack extends Spawner {
	static initialize(options: BarrackOptions) {
		return super.initialize(options) as Barrack;
	}

	lane: LaneId;
	waveCount = 0;
	damageBonus = 0;
	healthBonus = 0;
	minionLevel = 1;
	unitNamePrefix = '';
	spawnUnitsEnabled = true;

	constructor(options: BarrackOptions) {
		super(options);

		this.lane = options.lane;
		this.unitNamePrefix = (this.team.id === TeamId.order ? 'Blue' : 'Red') + '_Minion_';
	}

	/**
	 * Send packet to client to spawn unit
	 */
	spawnUnitAns(unitNetId: NetId, minionType: number, to: (packet: PacketMessage | undefined) => void) {
		const packet1 = packets.Barrack_SpawnUnit.create({
			//netId: unitNetId,
			netId: this.netId,
			objectId: unitNetId,
			objectNodeId: 0x40,
			barracksNetId: this.netId,
			waveCount: this.waveCount,
			minionType: minionType,
			damageBonus: this.damageBonus,
			healthBonus: this.healthBonus,
			//minionLevel: this.minionLevel,
		});
		to(packet1);
		//console.debug(packet1);
	}

	spawnUnit2(spawn: AttackableUnitOptions, aiOptions: Omit<MinionOptions, 'spawner' | 'owner'>) {
		const unit = AttackableUnit.initialize({
			...spawn,
			spawner: this,
			team: this.team.id,
		});
		unit.ai = Minion.initialize({
			...aiOptions,
			owner: unit,
			spawner: this,
		});

		unit.spawn();
		return unit;
	}

	spawnUnit(minionType: MinionType, options: Partial<AttackableUnitOptions> = {}) {
		const minionCharacter = minionNames[minionType];
		if (!minionCharacter)
			throw new Error(`unknown minion type: ${minionType}`);

		const character = this.unitNamePrefix + minionCharacter;

		return this.spawnUnit2({
			...options,
			character,
			name: character,
		}, {
			minionType,
		});
	}

	aliveInhibitors(teamId: TeamId) {
		return UnitAiList.inhibitors.filter(ai => {
			const owner = ai.owner;
			if (owner.team.id !== teamId)
				return false;
			if (owner.combat.died)
				return false;

			return true;
		});
	}

	findInhibitor(teamId: TeamId, lane: LaneId) {
		return UnitAiList.inhibitors.filter(ai => {
			const owner = ai.owner;
			if (owner.team.id !== teamId)
				return false;
			if (ai.lane !== lane)
				return false;

			return true;
		})[0];
	}

	/**
	 * Spawn next minion wave at position of this barrack
	 */
	async spawnWave() {
		if (!this.spawnUnitsEnabled)
			return;

		++this.waveCount;
		const spawnDelay = 800;

		let meleeCount = 3;
		let archerCount = 3;
		let casterCount = 0;
		let superCount = 0;

		const enemyTeamId = this.team.getEnemyTeamId();
		const sameLaneEnemyInhibitor = this.findInhibitor(enemyTeamId, this.lane);

		if (sameLaneEnemyInhibitor?.owner.combat.died) {
			const enemyAliveInhibitorsCount = this.aliveInhibitors(enemyTeamId).length;

			if (enemyAliveInhibitorsCount === 0)
				superCount = 2;
			else //if (enemyAliveInhibitorsCount === 1 || enemyAliveInhibitorsCount === 2)
				superCount = 1;
		}
		else {
			let casterMinionFreq = 3;
			const increaseMinionFreqTime = 2000;

			if (increaseMinionFreqTime > Server.game.timer.now())
				casterMinionFreq -= 1;

			if (this.waveCount % casterMinionFreq === 0)
				casterCount += 1;
		}

		// 1. Super minions
		for (let i = 0; i < superCount; i++) {
			this.spawnUnit(MinionType.super);
			await accurateDelay(spawnDelay);
		}

		// 2. Melee minions
		for (let i = 0; i < meleeCount; i++) {
			this.spawnUnit(MinionType.melee);
			await accurateDelay(spawnDelay);
		}

		// 3. Siege minions
		for (let i = 0; i < casterCount; i++) {
			this.spawnUnit(MinionType.cannon);
			await accurateDelay(spawnDelay);
		}

		// 4. Caster minions
		for (let i = 0; i < archerCount; i++) {
			this.spawnUnit(MinionType.caster);
			await accurateDelay(spawnDelay);
		}
	}

	static waveCount = 0;

	static spawnWave(list: Barrack[]) {
		++this.waveCount;
		console.log('Minions spawn - wave', this.waveCount);

		list.forEach(spawner => {
			spawner.spawnWave();
		});
	}

	static async runSpawners(list: Barrack[]) {
		const startAt = 1; // 90
		while (startAt > Server.game.timer.now())
			await delay(100);

		const interval = 30 * 1000;

		runAccurateInterval(() => {
			this.spawnWave(list);
		}, interval);

		this.spawnWave(list);
	}

	static spawnAll(spawnList = barracks) {
		const list: Barrack[] = [];

		for (let i = 0; i < spawnList.length; i++) {
			const spawn = spawnList[i]!;

			const barrack = Barrack.initialize(spawn);
			barrack.spawn();
			list.push(barrack);
		}

		this.runSpawners(list);
	}
}
