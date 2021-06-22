var Unit = require('./Unit');
const {createPacket, sendPacket} = require("../PacketUtilities");

const MovementDataType = {
	None: 0,
	WithSpeed: 1,
	Normal: 2,
	Stop: 3,
};
const MinionTypes = {
	MALEE: 0,
	CASTER: 3,
	CANNON: 2,
	SUPER: 1,
};

class Minion extends Unit {
	constructor(team, type, num){
		super('MINION', {}, team, num, type);

		
		var Barrack_SpawnUnit = createPacket('Barrack_SpawnUnit');
		Barrack_SpawnUnit.packet.netId = this.netId;
		Barrack_SpawnUnit.packet.ObjectID = this.netId;
		Barrack_SpawnUnit.packet.ObjectNodeID = 0x40;
		Barrack_SpawnUnit.packet.BarracksNetID = 0xffeb364c;//0xFF000000 | Crc32Algorithm.Compute(Encoding.UTF8.GetBytes(m.BarracksName));
		Barrack_SpawnUnit.packet.WaveCount = 1;
		Barrack_SpawnUnit.packet.MinionType = MinionTypes[type];
		Barrack_SpawnUnit.packet.DamageBonus = 10;
		Barrack_SpawnUnit.packet.HealthBonus = 7;
		Barrack_SpawnUnit.packet.MinionLevel = 1;
		var isSent = sendPacket(Barrack_SpawnUnit);
		
		var OBJECT_SPAWN = createPacket('OBJECT_SPAWN');
		OBJECT_SPAWN.packet.netId = this.netId;
		OBJECT_SPAWN.packet.ShieldValues = {
			Magical: 0,
			Physical: 0,
			MagicalAndPhysical: 0,
		};
		OBJECT_SPAWN.packet.LookAtPosition = {X: 1, Y: 0, Z: 0};
		OBJECT_SPAWN.packet.CharacterStackData = [
			{
				SkinName: this.model
			}
		];
		OBJECT_SPAWN.packet.MovementData = {
			//SyncID: 0x0F0FD189,
			Position: {X: 1533.0, Y: 1321.0},//this.transform.position,
			Forward: {X: 0, Y: 0},
		};
		console.log(OBJECT_SPAWN);
		console.log(OBJECT_SPAWN.packet.MovementData.Position);

		var isSent = sendPacket(OBJECT_SPAWN);
	}
}


module.exports = Minion;
