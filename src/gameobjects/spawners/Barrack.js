
import packets from '../../packets/index.js';
import Minion from '../units/Minion.js';

import Team from '../extensions/traits/Team.js';
import Server from '../../app/Server.js';
import UnitList from '../../app/UnitList.js';
import Spawner from './Spawner.js';
import { barracks } from '../positions/index.js';


/**
 * minion spawner
 */
export default class Barrack extends Spawner {

	waveCount = 1;
	damageBonus = 10;
	healthBonus = 7;
	minionLevel = 1;
	unitNamePrefix = '';

	/**
	 * @param {import('../GameObjects.js').BarrackOptions} options
	 */
	constructor(options) {
		super(options);

		UnitList.barracks[this.team.id][this.team.num] = this;
		this.unitNamePrefix = (this.team.id == Team.TEAM_BLUE ? 'Blue' : 'Red') + '_Minion_';
	}

	/**
	 * Send packet to client to spawn unit
	 * @param {number} unitNetId 
	 * @param {number} minionType 
	 */
	spawnUnitAns(unitNetId, minionType) {
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
	 * @param {string} character (Basic/MechCannon/MechMelee/Wizard)
	 * @returns {Minion}
	 */
	spawnUnit(character, options = {}) {
		character = (options.unitNamePrefix || this.unitNamePrefix) + character;
		return new Minion({ spawner: this, character, ...options });
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

	/**
	 * 
	 * @param {Object} spawnList {TEAM: [{netId, position}]}
	 */
	static spawnAll(spawnList = barracks) {
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
