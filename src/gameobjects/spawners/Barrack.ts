
import packets from '../../packets/index';
import Minion from '../units/Minion';

import Team from '../extensions/traits/Team';
import Server from '../../app/Server';
import UnitList from '../../app/UnitList';
import Spawner from './Spawner';
import { barracks } from '../positions/index';
import { BarrackOptions } from '../GameObjects';
import { Vector2Like } from '../../game/components/Pathfinding';


/**
 * minion spawner
 */
export default class Barrack extends Spawner {

	waveCount = 1;
	damageBonus = 10;
	healthBonus = 7;
	minionLevel = 1;
	unitNamePrefix = '';

	constructor(options: BarrackOptions) {
		super(options);

		UnitList.barracks[this.team.id][this.team.num] = this;
		this.unitNamePrefix = (this.team.id == Team.TEAM_BLUE ? 'Blue' : 'Red') + '_Minion_';
	}

	/**
	 * Send packet to client to spawn unit
	 */
	spawnUnitAns(unitNetId: number, minionType: number) {
		const packet1 = new packets.Barrack_SpawnUnit();
		packet1.netId = unitNetId;
		packet1.objectId = unitNetId;
		packet1.objectNodeId = 0x40;
		packet1.barracksNetId = this.netId;
		packet1.waveCount = this.waveCount;
		packet1.minionType = minionType;
		packet1.damageBonus = this.damageBonus;
		packet1.healthBonus = this.healthBonus;
		packet1.minionLevel = this.minionLevel;
		Server.teams[Team.TEAM_MAX].sendPacket(packet1);
		//console.debug(packet1);
	}

	/**
	 * Spawn minion at position of this barrack
	 * character (Basic/MechCannon/MechMelee/Wizard)
	 */
	spawnUnit(character: string, options = {}) {
		character = (options.unitNamePrefix || this.unitNamePrefix) + character;
		return Minion.initialize({ spawner: this, character, ...options });
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
			await Promise.wait(800);
		}

		// 3. Siege minions
		//One Siege minion spawns in every third wave, in each lane.
		//Do not spawns on lanes on which super minions are spawning.
		if (this.waveCount % 3 == 2 && !superMinionsSpawn) {
			this.spawnUnit('MechCannon');
			await Promise.wait(800);
		}

		// 4. Caster minions
		for (let i = 0; i < 3; i++) {
			this.spawnUnit('Wizard');
			await Promise.wait(800);
		}
	}

	static spawnAll(spawnList: { [TEAM: number]: { netId: number, position: Vector2Like }[] } = barracks) {
		for (let team in spawnList) {
			let teamSpawnList = spawnList[team];

			for (let num in teamSpawnList) {
				let spawn = teamSpawnList[num];

				new Barrack({
					team, num,
					netId: spawn.netId,
					spawnPosition: spawn.position,
					info: spawn.info,
				});
			}
		}
	}
}
