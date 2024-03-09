
import * as packets from '@workspace/packets/packages/packets';
import Minion, { MinionOptions } from '../units/minion';

import { TeamId } from '../extensions/traits/team';
import Server from '../../app/server';
import Spawner, { SpawnerOptions } from './spawner';
import { barracks } from '../positions/index';
import { NetId } from '@workspace/packets/packages/packets/types/player';


export type BarrackOptions = SpawnerOptions & {

};

/**
 * minion spawner
 */
export default class Barrack extends Spawner {
	static initialize(options: BarrackOptions) {
		return super.initialize(options) as Barrack;
	}

	waveCount = 1;
	damageBonus = 10;
	healthBonus = 7;
	minionLevel = 1;
	unitNamePrefix = '';

	constructor(options: BarrackOptions) {
		super(options);

		this.unitNamePrefix = (this.team.id == TeamId.order ? 'Blue' : 'Red') + '_Minion_';
	}

	/**
	 * Send packet to client to spawn unit
	 */
	spawnUnitAns(unitNetId: NetId, minionType: number) {
		const packet1 = packets.Barrack_SpawnUnit.create({
			netId: unitNetId,
			objectId: unitNetId,
			objectNodeId: 0x40,
			barracksNetId: this.netId,
			waveCount: this.waveCount,
			minionType: minionType,
			damageBonus: this.damageBonus,
			healthBonus: this.healthBonus,
			minionLevel: this.minionLevel,
		});
		Server.teams[TeamId.max].sendPacket(packet1);
		//console.debug(packet1);
	}

	/**
	 * Spawn minion at position of this barrack
	 * character (Basic/MechCannon/MechMelee/Wizard)
	 */
	spawnUnit(character: string, options: Partial<MinionOptions> & { unitNamePrefix?: string } = {}) {
		character = (options.unitNamePrefix || this.unitNamePrefix) + character;
		return Minion.initialize({
			spawner: this,
			team: this.team.id,
			character,
			...options,
		});
	}

	/**
	 * Spawn next minion wave at position of this barrack
	 */
	async spawnWave() {
		++this.waveCount;

		// 1. Super minions
		let superMinionsSpawn = false;
		//todo
		//	if()
		//		this.spawnUnit('MechMelee');

		// 2. Melee minions
		for (let i = 0; i < 3; i++) {
			this.spawnUnit('Basic');
			await Promise.delay(800);
		}

		// 3. Siege minions
		//One Siege minion spawns in every third wave, in each lane.
		//Do not spawns on lanes on which super minions are spawning.
		if (this.waveCount % 3 == 2 && !superMinionsSpawn) {
			this.spawnUnit('MechCannon');
			await Promise.delay(800);
		}

		// 4. Caster minions
		for (let i = 0; i < 3; i++) {
			this.spawnUnit('Wizard');
			await Promise.delay(800);
		}
	}

	static spawnAll(spawnList = barracks) {
		for (let team in spawnList) {
			let teamSpawnList = spawnList[team];

			for (let num in teamSpawnList) {
				let spawn = teamSpawnList[num];

				Barrack.initialize({
					team: Number(team),
					num: Number(num),
					netId: spawn.netId,
					spawnPosition: spawn.position,
					info: spawn.info,
				});
			}
		}
	}
}
