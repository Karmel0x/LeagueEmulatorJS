
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");

async function GameTimeHeartBeat(){
	
	var time = 0;
	for(;;){
		var GAME_TIMER = createPacket('GAME_TIMER');
		GAME_TIMER.packet.SynchTime = time;
		var isSent = sendPacket(GAME_TIMER);

		await global.Utilities.wait(10 * 1000);
		time += 10;
	}
}

module.exports = function(q, obj1){
	console.log('handle: C2S.START_GAME');
	console.log(obj1);


	var START_GAME = createPacket('START_GAME');
	START_GAME.packet.EnablePause_bitField = true;
	var isSent = sendPacket(START_GAME);

	//var LOAD_SCREEN_INFO = createPacket('LOAD_SCREEN_INFO', 'LOADING_SCREEN');
	//LOAD_SCREEN_INFO.packet.blueMax = 1;
	//LOAD_SCREEN_INFO.packet.redMax = 0;
	//LOAD_SCREEN_INFO.packet.teamBlue_playerIds = [1];
	//LOAD_SCREEN_INFO.packet.teamRed_playerIds = [];
	//LOAD_SCREEN_INFO.packet.currentBlue = 1;
	//LOAD_SCREEN_INFO.packet.currentRed = 0;
	//var isSent = sendPacket(LOAD_SCREEN_INFO);

	//var CHAMPION_RESPAWN = createPacket('CHAMPION_RESPAWN');
    //CHAMPION_RESPAWN.packet.netId = global.Players[0].netId;
	//CHAMPION_RESPAWN.packet.Vector3 = {X: 3000, Y: 2000, H: 500};
	//var isSent = sendPacket(CHAMPION_RESPAWN);
	
	var OBJECT_SPAWN = createPacket('OBJECT_SPAWN');
    OBJECT_SPAWN.packet.netId = global.Players[0].netId;
	//OBJECT_SPAWN.packet.Packet = [];
	//OBJECT_SPAWN.packet.Packet_length = OBJECT_SPAWN.packet.Packet.length;
	OBJECT_SPAWN.packet.ItemData = [/*{
		Slot: 1,
		ItemsInSlot: 1,
		SpellCharges: 1,
		ItemID: 1,
	}*/];
	OBJECT_SPAWN.packet.ShieldValues = {
		Magical: 0,
		Physical: 0,
		MagicalAndPhysical: 0,
	};
	//OBJECT_SPAWN.packet.CharacterStackData = [];
	//OBJECT_SPAWN.packet.CharacterStackData_length = OBJECT_SPAWN.packet.CharacterStackData.length;
	//OBJECT_SPAWN.packet.LookAtNetID = 0;
	//OBJECT_SPAWN.packet.LookAtType = 0;
	OBJECT_SPAWN.packet.LookAtPosition = {X: 1, Y: 0, Z: 0};
	//OBJECT_SPAWN.packet.Buff = [];
	//OBJECT_SPAWN.packet.Buff_length = OBJECT_SPAWN.packet.Buff.length;
	OBJECT_SPAWN.packet.UnknownIsHero = true;
	//OBJECT_SPAWN.packet.MovementData = [];
	//OBJECT_SPAWN.packet.MovementDataWithHeader_bool = !!OBJECT_SPAWN.packet.MovementData;
    OBJECT_SPAWN.packet.CharacterStackData = [
        {
            SkinName: 'Ezreal'
        }
    ];
    
	OBJECT_SPAWN.packet.MovementData = {
		//SyncID: 0x0F0FD189,
		Position: {X: 26.0, Y: 280.0},//this.transform.position,
		Forward: {X: 0, Y: 0},
	};

	var isSent = sendPacket(OBJECT_SPAWN);
	
	var GAME_TIMER = createPacket('GAME_TIMER');
	GAME_TIMER.packet.SynchTime = 0;
	var isSent = sendPacket(GAME_TIMER);
	
	var GAME_TIMER_UPDATE = createPacket('GAME_TIMER_UPDATE');
	GAME_TIMER_UPDATE.packet.StartTime = 0;
	var isSent = sendPacket(GAME_TIMER_UPDATE);

	GameTimeHeartBeat();
};
