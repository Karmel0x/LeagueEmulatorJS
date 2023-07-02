const Minion = require("../units/Minion");

const Team = require("../extensions/traits/Team");
const Server = require("../../app/Server");
const UnitList = require("../../app/UnitList");
const Spawner = require("./Spawner");
const { barracks } = require("../positions");


/**
 * minion spawner
 */
module.exports = class Barrack extends Spawner {

	waveCount = 1;
	damageBonus = 10;
	healthBonus = 7;
	minionLevel = 1;
	unitNamePrefix = '';

	/**
	 * @param {import('../GameObjects').BarrackOptions} options
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
		const Barrack_SpawnUnit = Server.network.createPacket('Barrack_SpawnUnit');
		Barrack_SpawnUnit.netId = unitNetId;
		Barrack_SpawnUnit.objectId = unitNetId;
		Barrack_SpawnUnit.objectNodeId = 0x40;
		Barrack_SpawnUnit.barracksNetId = this.netId;
		Barrack_SpawnUnit.waveCount = this.waveCount;
		Barrack_SpawnUnit.minionType = minionType;
		Barrack_SpawnUnit.damageBonus = this.damageBonus;
		Barrack_SpawnUnit.healthBonus = this.healthBonus;
		Barrack_SpawnUnit.minionLevel = this.minionLevel;
		Server.teams[Team.TEAM_MAX].sendPacket(Barrack_SpawnUnit);
		//console.debug(Barrack_SpawnUnit);
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
};
