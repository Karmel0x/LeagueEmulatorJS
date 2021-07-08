var Unit = require('./Unit');
const {createPacket, sendPacket} = require("../../PacketUtilities");
const { Vector2 } = require('three');

const MovementDataType = {
	None: 0,
	WithSpeed: 1,
	Normal: 2,
	Stop: 3,
};

const Minions = {
	MALEE : {id: 0, exp: 64, gold: 19.8, goldPer90: 0.2},
	CASTER: {id: 3, exp: 32, gold: 16.8, goldPer90: 0.2},
	CANNON: {id: 2, exp: 92, gold: 40.0, goldPer90: 0.5},
	SUPER : {id: 1, exp: 97, gold: 40.0, goldPer90: 0.5},
};
const Barracks = {//0xFF000000 | Crc32Algorithm.Compute(Encoding.UTF8.GetBytes(m.BarracksName));//{x: 1533.0, y: 1321.0}
	__P_Order_Spawn_Barracks__L01: {hash: 0xFFEB364C, position: {x: 917.7302, y:1720.3623}},//0x42EB364C//,Z:140.0677
	__P_Order_Spawn_Barracks__C01: {hash: 0xFFB77171, position: {x:1418.3711, y:1686.375 }},//0x49B77171//,Z:134.7595
	__P_Order_Spawn_Barracks__R01: {hash: 0xFF53B836, position: {x:1487.0896, y:1302.0958}},//0x5453B836//,Z:144.2386
	__P_Chaos_Spawn_Barracks__L01: {hash: 0xFFE647D5, position: {x:12451.051, y:13217.542}},//0x72E647D5//,Z:143.9473
	__P_Chaos_Spawn_Barracks__C01: {hash: 0xFFBA00E8, position: {x:12511.773, y:12776.932}},//0x79BA00E8//,Z:126.2741
	__P_Chaos_Spawn_Barracks__R01: {hash: 0xFF5EC9AF, position: {x:13062.496, y:12760.784}},//0x645EC9AF//,Z:134.706 
};
const BarracksByTeam = {
	'BLUE': [
		Barracks.__P_Order_Spawn_Barracks__L01,
		Barracks.__P_Order_Spawn_Barracks__C01,
		Barracks.__P_Order_Spawn_Barracks__R01,
	],
	'RED': [
		Barracks.__P_Chaos_Spawn_Barracks__L01,
		Barracks.__P_Chaos_Spawn_Barracks__C01,
		Barracks.__P_Chaos_Spawn_Barracks__R01,
	],
};

class Minion extends Unit {
	constructor(team, type, num){
		super('MINION', {
			base: Minions[type],
		}, team, num, type);


	}
	initialize(){

	}
	spawn(){
		let pos = BarracksByTeam[this.info.team][this.info.num].position;
		this.transform = {
			position: new Vector2(pos.x, pos.y),
			rotation: 0,
		};

		var Barrack_SpawnUnit = createPacket('Barrack_SpawnUnit');
		Barrack_SpawnUnit.netId = this.netId;
		Barrack_SpawnUnit.ObjectID = this.netId;
		Barrack_SpawnUnit.ObjectNodeID = 0x40;
		Barrack_SpawnUnit.BarracksNetID = BarracksByTeam[this.info.team][this.info.num].hash;
		Barrack_SpawnUnit.WaveCount = 1;
		Barrack_SpawnUnit.MinionType = this.base.id;
		Barrack_SpawnUnit.DamageBonus = 10;
		Barrack_SpawnUnit.HealthBonus = 7;
		Barrack_SpawnUnit.MinionLevel = 1;
		var isSent = global.Teams.ALL.sendPacket(Barrack_SpawnUnit);
		console.log(Barrack_SpawnUnit);

		super.spawn();
		this.moveLane();
	}
	moveLane(){
		
	}
}


module.exports = Minion;
