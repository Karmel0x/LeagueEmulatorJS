const Minion = require("../Units/Minion");
const {createPacket, sendPacket} = require("../../Core/PacketUtilities");
const { Vector2 } = require("three");

const BaseInterface = require("../../Core/BaseInterface");
const GameObject = require("../GameObject");
const IHasTeam = require("../Interfaces/IHasTeam");


const Barracks = {//0xFF000000 | Crc32Algorithm.Compute(Encoding.UTF8.GetBytes(m.BarracksName));//{x: 1533.0, y: 1321.0}
	BLUE: {
		0: {netId: 0xFFEB364C, position: {x: 917.7302, y:1720.3623}, info: {name: '__P_Order_Spawn_Barracks__L01'}},//0x42EB364C//,Z:140.0677
		1: {netId: 0xFFB77171, position: {x:1418.3711, y:1686.375 }, info: {name: '__P_Order_Spawn_Barracks__C01'}},//0x49B77171//,Z:134.7595
		2: {netId: 0xFF53B836, position: {x:1487.0896, y:1302.0958}, info: {name: '__P_Order_Spawn_Barracks__R01'}},//0x5453B836//,Z:144.2386
	},
	RED: {
		0: {netId: 0xFFE647D5, position: {x:12451.051, y:13217.542}, info: {name: '__P_Chaos_Spawn_Barracks__L01'}},//0x72E647D5//,Z:143.9473
		1: {netId: 0xFFBA00E8, position: {x:12511.773, y:12776.932}, info: {name: '__P_Chaos_Spawn_Barracks__C01'}},//0x79BA00E8//,Z:126.2741
		2: {netId: 0xFF5EC9AF, position: {x:13062.496, y:12760.784}, info: {name: '__P_Chaos_Spawn_Barracks__R01'}},//0x645EC9AF//,Z:134.706 
	},
};

global.Barracks = global.Barracks || {};
global.Barracks['BLUE'] = global.Barracks['BLUE'] || {};
global.Barracks['RED'] = global.Barracks['RED'] || {};


module.exports = class Barrack extends BaseInterface(GameObject, IHasTeam) {

	/**
	 * 
	 * @param {String} team {BLUE/RED}
	 * @param {Number} num {0=TOP/1=MID/2=BOT}
	 */
	constructor(...args){
		super(...args);

		global.Barracks[this.teamName][this.num] = this;
	}

	WaveCount = 1;
	DamageBonus = 10;
	HealthBonus = 7;
	MinionLevel = 1;

	/**
	 * Send packet to client to spawn unit
	 * @param {Number} UnitNetId 
	 * @param {Number} minionType 
	 */
	spawnUnitAns(UnitNetId, minionType){
		var Barrack_SpawnUnit = createPacket('Barrack_SpawnUnit');
		Barrack_SpawnUnit.netId = UnitNetId;
		Barrack_SpawnUnit.ObjectID = UnitNetId;
		Barrack_SpawnUnit.ObjectNodeID = 0x40;
		Barrack_SpawnUnit.BarracksNetId = this.netId;
		Barrack_SpawnUnit.WaveCount = this.WaveCount;
		Barrack_SpawnUnit.MinionType = minionType;
		Barrack_SpawnUnit.DamageBonus = this.DamageBonus;
		Barrack_SpawnUnit.HealthBonus = this.HealthBonus;
		Barrack_SpawnUnit.MinionLevel = this.MinionLevel;
		global.Teams.ALL.sendPacket(Barrack_SpawnUnit);
		//console.debug(Barrack_SpawnUnit);
	}
	/**
	 * Spawn minion at position of this barrack
	 * @param {String} character (Basic/MechCannon/MechMelee/Wizard)
	 * @returns {Minion}
	 */
	spawnUnit(character, options = {}){
		character = 'Blue_Minion_Basic';
		return new Minion({barrack: this, character, ...options});
	}
	/**
	 * Spawn next minion wave at position of this barrack
	 */
	async spawnWave(){
		++this.WaveCount;

		// 1. Super minions
		let superMinionsSpawn = false;
		//todo
		//	if()
		//		this.spawnUnit('MechMelee');

		// 2. Melee minions
		for(let i = 0; i < 3; i++){
			this.spawnUnit('Basic');
			await global.Utilities.wait(800);
		}

		// 3. Siege minions
		//One Siege minion spawns in every third wave, in each lane.
		//Do not spawns on lanes on which super minions are spawning.
		if(this.WaveCount % 3 == 2 && !superMinionsSpawn){
			this.spawnUnit('MechCannon');
			await global.Utilities.wait(800);
		}

		// 4. Caster minions
		for(let i = 0; i < 3; i++){
			this.spawnUnit('Wizard');
			await global.Utilities.wait(800);
		}
	}
	
	/**
	 * 
	 * @param {Object} spawnList {TEAM: [{netId, position}]}
	 */
	 static spawnAll(spawnList = Barracks){
		for(let team in spawnList)
			for(let num in spawnList[team])
				new Barrack({
					team, num,
					netId: spawnList[team][num].netId,
					spawnPosition: spawnList[team][num].position,
					info: spawnList[team][num].info,
				});
	}
};
