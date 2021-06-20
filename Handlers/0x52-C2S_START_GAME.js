
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");


module.exports = function(q){
	console.log('handle: C2S_START_GAME');

	{
		var obj1 = q.packet.readobj(Packets.cmd.C2S_START_GAME.packet);
		q.packet.off = 0;
		console.log(obj1);
	}

	var S2C_START_GAME = createPacket('S2C_START_GAME');
	var isSent = sendPacket(S2C_START_GAME);

	var S2C_LOAD_SCREEN_INFO = createPacket('S2C_LOAD_SCREEN_INFO');
	S2C_LOAD_SCREEN_INFO.packet.blueMax = 1;
	S2C_LOAD_SCREEN_INFO.packet.redMax = 0;
	S2C_LOAD_SCREEN_INFO.packet.teamBlue_playerIds = [1];
	S2C_LOAD_SCREEN_INFO.packet.teamRed_playerIds = [];
	S2C_LOAD_SCREEN_INFO.packet.currentBlue = 1;
	S2C_LOAD_SCREEN_INFO.packet.currentRed = 0;
	var isSent = sendPacket(S2C_LOAD_SCREEN_INFO);

	//var S2C_CHAMPION_RESPAWN = createPacket('S2C_CHAMPION_RESPAWN');
    //S2C_CHAMPION_RESPAWN.packet.netId = 0x40000001;
	//S2C_CHAMPION_RESPAWN.packet.Vector3 = {X: 3000, Y: 2000, H: 500};
	//var isSent = sendPacket(S2C_CHAMPION_RESPAWN);
	
	var S2C_OBJECT_SPAWN = createPacket('S2C_OBJECT_SPAWN');
    S2C_OBJECT_SPAWN.packet.netId = 0x40000001;
	//S2C_OBJECT_SPAWN.packet.Packet = [];
	//S2C_OBJECT_SPAWN.packet.Packet_length = S2C_OBJECT_SPAWN.packet.Packet.length;
	S2C_OBJECT_SPAWN.packet.ItemData = [{
		Slot: 1,
		ItemsInSlot: 1,
		SpellCharges: 1,
		ItemID: 1,
	}];
	S2C_OBJECT_SPAWN.packet.ItemData_length = S2C_OBJECT_SPAWN.packet.ItemData.length;
	//S2C_OBJECT_SPAWN.packet.ShieldValues = [];
	//S2C_OBJECT_SPAWN.packet.ShieldValues_bool = !!S2C_OBJECT_SPAWN.packet.ShieldValues;
	//S2C_OBJECT_SPAWN.packet.CharacterStackData = [];
	//S2C_OBJECT_SPAWN.packet.CharacterStackData_length = S2C_OBJECT_SPAWN.packet.CharacterStackData.length;
	//S2C_OBJECT_SPAWN.packet.LookAtNetID = 0;
	//S2C_OBJECT_SPAWN.packet.LookAtType = 0;
	//S2C_OBJECT_SPAWN.packet.LookAtPosition = {X: 0, Y: 0, Z: 0};
	//S2C_OBJECT_SPAWN.packet.Buff = [];
	//S2C_OBJECT_SPAWN.packet.Buff_length = S2C_OBJECT_SPAWN.packet.Buff.length;
	//S2C_OBJECT_SPAWN.packet.UnknownIsHero = false;
	//S2C_OBJECT_SPAWN.packet.MovementData = [];
	//S2C_OBJECT_SPAWN.packet.MovementDataWithHeader_bool = !!S2C_OBJECT_SPAWN.packet.MovementData;
    S2C_OBJECT_SPAWN.packet.CharacterStackData = [
        {
            SkinName: 'Nautilus'
        }
    ];
    //S2C_OBJECT_SPAWN.packet.CharacterStackData_length = S2C_OBJECT_SPAWN.packet.CharacterStackData.length;

	var isSent = sendPacket(S2C_OBJECT_SPAWN);
	
	var S2C_GAME_TIMER = createPacket('S2C_GAME_TIMER');
	S2C_GAME_TIMER.packet.SynchTime = 0;
	var isSent = sendPacket(S2C_GAME_TIMER);
	
	var S2C_GAME_TIMER_UPDATE = createPacket('S2C_GAME_TIMER_UPDATE');
	S2C_GAME_TIMER_UPDATE.packet.StartTime = 0;
	var isSent = sendPacket(S2C_GAME_TIMER_UPDATE);

};
