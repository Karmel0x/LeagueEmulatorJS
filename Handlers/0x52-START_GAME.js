
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");
const loadingStages = require('../Constants/loadingStages');


async function GameTimeHeartBeat(){
	
	var time = 0;
	for(;;){
		var GAME_TIMER = createPacket('GAME_TIMER');
		GAME_TIMER.SynchTime = time;
		var isSent = global.Teams.ALL.sendPacket(GAME_TIMER);

		await global.Utilities.wait(10 * 1000);
		time += 10;
	}
}

module.exports = (player, packet) => {
	console.log('handle: C2S.START_GAME');
	//console.log(packet);


	var START_GAME = createPacket('START_GAME');
	START_GAME.bitfield_EnablePause = true;
	var isSent = player.sendPacket(START_GAME, loadingStages.NOT_CONNECTED);

	//var LOAD_SCREEN_INFO = createPacket('LOAD_SCREEN_INFO', 'LOADING_SCREEN');
	//LOAD_SCREEN_INFO.blueMax = 1;
	//LOAD_SCREEN_INFO.redMax = 0;
	//LOAD_SCREEN_INFO.teamBlue_playerIds = [1];
	//LOAD_SCREEN_INFO.teamRed_playerIds = [];
	//LOAD_SCREEN_INFO.currentBlue = 1;
	//LOAD_SCREEN_INFO.currentRed = 0;
	//var isSent = player.sendPacket(LOAD_SCREEN_INFO);

	//var CHAMPION_RESPAWN = createPacket('CHAMPION_RESPAWN');
    //CHAMPION_RESPAWN.netId = player.netId;
	//CHAMPION_RESPAWN.Vector3 = {x: 3000, y: 2000, H: 500};
	//var isSent = player.sendPacket(CHAMPION_RESPAWN);

	player.loadingStage = loadingStages.IN_GAME;
	global.Teams['BLUE'].vision(player, true);
	
	var GAME_TIMER = createPacket('GAME_TIMER');
	GAME_TIMER.SynchTime = 0;
	var isSent = player.sendPacket(GAME_TIMER);
	
	var GAME_TIMER_UPDATE = createPacket('GAME_TIMER_UPDATE');
	GAME_TIMER_UPDATE.StartTime = 0;
	var isSent = player.sendPacket(GAME_TIMER_UPDATE);

	GameTimeHeartBeat();
};
