const Minion = require("./Minion");
const {createPacket, sendPacket} = require("../../PacketUtilities");


const Barracks = {//0xFF000000 | Crc32Algorithm.Compute(Encoding.UTF8.GetBytes(m.BarracksName));//{x: 1533.0, y: 1321.0}
	'BLUE': [
		{name: '__P_Order_Spawn_Barracks__L01', hash: 0xFFEB364C, position: {x: 917.7302, y:1720.3623}},//0x42EB364C//,Z:140.0677
		{name: '__P_Order_Spawn_Barracks__C01', hash: 0xFFB77171, position: {x:1418.3711, y:1686.375 }},//0x49B77171//,Z:134.7595
		{name: '__P_Order_Spawn_Barracks__R01', hash: 0xFF53B836, position: {x:1487.0896, y:1302.0958}},//0x5453B836//,Z:144.2386
	],
	'RED': [
		{name: '__P_Chaos_Spawn_Barracks__L01', hash: 0xFFE647D5, position: {x:12451.051, y:13217.542}},//0x72E647D5//,Z:143.9473
		{name: '__P_Chaos_Spawn_Barracks__C01', hash: 0xFFBA00E8, position: {x:12511.773, y:12776.932}},//0x79BA00E8//,Z:126.2741
		{name: '__P_Chaos_Spawn_Barracks__R01', hash: 0xFF5EC9AF, position: {x:13062.496, y:12760.784}},//0x645EC9AF//,Z:134.706 
	],
};

global.Barracks = global.Barracks || {};
global.Barracks['BLUE'] = global.Barracks['BLUE'] || {};
global.Barracks['RED'] = global.Barracks['RED'] || {};


module.exports = class Barrack {
	hash = 0xFF000000;
	position = {x: 0, y: 0};
	team = '';
	num = 0;
	constructor(team, num){
		this.team = team;
		this.num = num;

		let barrack = Barracks[team][num];
		this.hash = barrack.hash;
		this.position = barrack.position;

		global.Barracks[team][num] = this;
	}

	WaveCount = 1;
	DamageBonus = 10;
	HealthBonus = 7;
	MinionLevel = 1;

	spawnUnitAns(netId, minionType){
		var Barrack_SpawnUnit = createPacket('Barrack_SpawnUnit');
		Barrack_SpawnUnit.netId = netId;
		Barrack_SpawnUnit.ObjectID = netId;
		Barrack_SpawnUnit.ObjectNodeID = 0x40;
		Barrack_SpawnUnit.BarracksNetID = this.hash;
		Barrack_SpawnUnit.WaveCount = this.WaveCount;
		Barrack_SpawnUnit.MinionType = minionType;
		Barrack_SpawnUnit.DamageBonus = this.DamageBonus;
		Barrack_SpawnUnit.HealthBonus = this.HealthBonus;
		Barrack_SpawnUnit.MinionLevel = this.MinionLevel;
		var isSent = global.Teams.ALL.sendPacket(Barrack_SpawnUnit);
		//console.debug(Barrack_SpawnUnit);
	}
	spawnUnit(minionName){
		return new Minion(this.team, this.num, minionName, {barrack: this});
	}
	async spawnWave(){
		++this.WaveCount;

		// 1. Super minions
		let superMinionsSpawn = false;
		//todo
		//	if()
		//		this.spawnUnit('MechMalee');

		// 2. Malee minions
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
	
    static spawnAll(){
        for(let i = 0; i < 3; i++){
            new Barrack('BLUE', i);
            new Barrack('RED', i);
        }
    }
};
