var Unit = require('./Unit');
const {createPacket, sendPacket} = require("../PacketUtilities");

const MovementDataType = {
	None: 0,
	WithSpeed: 1,
	Normal: 2,
	Stop: 3,
};

class Minion extends Unit {
	constructor(team, type, num){
		super('MINION', {}, team, num, type);
		
		var S2C_OBJECT_SPAWN = createPacket('S2C_OBJECT_SPAWN');
		S2C_OBJECT_SPAWN.packet.netId = this.netId;
		//S2C_OBJECT_SPAWN.packet.Packet = [];
		//S2C_OBJECT_SPAWN.packet.Packet_length = S2C_OBJECT_SPAWN.packet.Packet.length;
		//S2C_OBJECT_SPAWN.packet.ItemData = [{
		//	Slot: 1,
		//	ItemsInSlot: 1,
		//	SpellCharges: 1,
		//	ItemID: 1,
		//}];
		S2C_OBJECT_SPAWN.packet.ShieldValues = {
			Magical: 0,
			Physical: 0,
			MagicalAndPhysical: 0,
		};
		//S2C_OBJECT_SPAWN.packet.ShieldValues = [];
		//S2C_OBJECT_SPAWN.packet.ShieldValues_bool = !!S2C_OBJECT_SPAWN.packet.ShieldValues;
		//S2C_OBJECT_SPAWN.packet.CharacterStackData = [];
		//S2C_OBJECT_SPAWN.packet.CharacterStackData_length = S2C_OBJECT_SPAWN.packet.CharacterStackData.length;
		//S2C_OBJECT_SPAWN.packet.LookAtNetID = 0;
		//S2C_OBJECT_SPAWN.packet.LookAtType = 0;
		S2C_OBJECT_SPAWN.packet.LookAtPosition = {X: 1, Y: 0, Z: 0};
		//S2C_OBJECT_SPAWN.packet.Buff = [];
		//S2C_OBJECT_SPAWN.packet.Buff_length = S2C_OBJECT_SPAWN.packet.Buff.length;
		//S2C_OBJECT_SPAWN.packet.UnknownIsHero = false;
		//S2C_OBJECT_SPAWN.packet.MovementData = [];
		//S2C_OBJECT_SPAWN.packet.MovementDataWithHeader_bool = !!S2C_OBJECT_SPAWN.packet.MovementData;
		S2C_OBJECT_SPAWN.packet.CharacterStackData = [
			{
				SkinName: this.model
			}
		];
		S2C_OBJECT_SPAWN.packet.MovementData = {
			//SyncID: 0x0F0FD189,
			Position: {X: 1533.0, Y: 1321.0},//this.transform.position,
			Forward: {X: 0, Y: 0},
		};
		console.log(S2C_OBJECT_SPAWN);
		console.log(S2C_OBJECT_SPAWN.packet.MovementData.Position);

		var isSent = sendPacket(S2C_OBJECT_SPAWN);
	}
}


module.exports = Minion;
