var Unit = require('./Unit');
const {createPacket, sendPacket} = require("../PacketUtilities");

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
const Barracks = {//0xFF000000 | Crc32Algorithm.Compute(Encoding.UTF8.GetBytes(m.BarracksName));//{X: 1533.0, Y: 1321.0}
	__P_Order_Spawn_Barracks__L01: {hash: 0xFFEB364C, position: {X: 917.7302,Y:1720.3623}},//0x42EB364C//,Z:140.0677
	__P_Order_Spawn_Barracks__C01: {hash: 0xFFB77171, position: {X:1418.3711,Y:1686.375 }},//0x49B77171//,Z:134.7595
	__P_Order_Spawn_Barracks__R01: {hash: 0xFF53B836, position: {X:1487.0896,Y:1302.0958}},//0x5453B836//,Z:144.2386
	__P_Chaos_Spawn_Barracks__L01: {hash: 0xFFE647D5, position: {X:12451.051,Y:13217.542}},//0x72E647D5//,Z:143.9473
	__P_Chaos_Spawn_Barracks__C01: {hash: 0xFFBA00E8, position: {X:12511.773,Y:12776.932}},//0x79BA00E8//,Z:126.2741
	__P_Chaos_Spawn_Barracks__R01: {hash: 0xFF5EC9AF, position: {X:13062.496,Y:12760.784}},//0x645EC9AF//,Z:134.706 
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
		super('MINION', {}, team, num, type);

		this.base = Minions[type];
		this.spawn(team, num);
		this.moveLane();
	}
	spawn(team, num){
		var Barrack_SpawnUnit = createPacket('Barrack_SpawnUnit');
		Barrack_SpawnUnit.netId = this.netId;
		Barrack_SpawnUnit.ObjectID = this.netId;
		Barrack_SpawnUnit.ObjectNodeID = 0x40;
		Barrack_SpawnUnit.BarracksNetID = BarracksByTeam[team][num].hash;
		Barrack_SpawnUnit.WaveCount = 1;
		Barrack_SpawnUnit.MinionType = this.base.id;
		Barrack_SpawnUnit.DamageBonus = 10;
		Barrack_SpawnUnit.HealthBonus = 7;
		Barrack_SpawnUnit.MinionLevel = 1;
		var isSent = sendPacket(Barrack_SpawnUnit);
		console.log(Barrack_SpawnUnit);
		
		var OBJECT_SPAWN = createPacket('OBJECT_SPAWN');
		OBJECT_SPAWN.netId = this.netId;
		OBJECT_SPAWN.ShieldValues = {
			Magical: 0,
			Physical: 0,
			MagicalAndPhysical: 0,
		};
		OBJECT_SPAWN.LookAtPosition = {X: 1, Y: 0, Z: 0};
		OBJECT_SPAWN.CharacterStackData = [
			{
				SkinName: this.model
			}
		];
		OBJECT_SPAWN.MovementData = {
			//SyncID: 0x0F0FD189,
			Position: BarracksByTeam[team][num].position,//this.transform.position,
			Forward: {X: 0, Y: 0},
		};
		var isSent = sendPacket(OBJECT_SPAWN);
		console.log(OBJECT_SPAWN);
		console.log(OBJECT_SPAWN.MovementData.Position);
	}
	moveLane(){
		
	}
	getExp(){
		return this.base.exp;
	}
	getGold(){
		return this.base.gold + this.base.goldPer90 * parseInt(global.Game.Timer / 90);
	}
}


module.exports = Minion;
