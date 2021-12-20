
const loadingStages = require('../../Constants/loadingStages');
var GameComponents = {
	Spawn: require('../Components/Spawn'),
	//Fountain: require('../Components/Fountain'),
	MovementSimulation: require('../Components/MovementSimulation'),
};
var playersConfig = require('../../Constants/playersConfig');
const { createPacket } = require('../../Core/PacketUtilities');

class Game {
	// STAGE client opened ==========================================================
	static PING_LOAD_INFO(player, packet){
		var PING_LOAD_INFO = createPacket('PING_LOAD_INFO', 'LOW_PRIORITY');
		PING_LOAD_INFO.ClientID = player._PlayerInfo.ClientID;
		PING_LOAD_INFO.PlayerID = player._PlayerInfo.PlayerID;
		PING_LOAD_INFO.Percentage = packet.Percentage;
		PING_LOAD_INFO.ETA = packet.ETA;
		PING_LOAD_INFO.Count = packet.Count;
		PING_LOAD_INFO.Ping = packet.Ping;
		PING_LOAD_INFO.bitfield_Ready = packet.bitfield_Ready;
		//PING_LOAD_INFO.bitfield = {
		//	Ready: packet.bitfield.Ready,
		//};
		global.Teams.ALL.sendPacket(PING_LOAD_INFO, loadingStages.NOT_CONNECTED);
	}

	static LOAD_SCREEN_INFO(player){
		var LOAD_SCREEN_INFO = createPacket('LOAD_SCREEN_INFO', 'LOADING_SCREEN');
		LOAD_SCREEN_INFO.blueMax = 6;
		LOAD_SCREEN_INFO.redMax = 6;
		LOAD_SCREEN_INFO.teamBlue_playerIds = [];
		LOAD_SCREEN_INFO.teamRed_playerIds = [];
		
		for(let player_num in global.Units['BLUE'].Player){
			var player = global.Units['BLUE'].Player[player_num];
			LOAD_SCREEN_INFO.teamBlue_playerIds.push(player._PlayerInfo.PlayerID);
		}
		for(let player_num in global.Units['RED'].Player){
			var player = global.Units['RED'].Player[player_num];
			LOAD_SCREEN_INFO.teamRed_playerIds.push(player._PlayerInfo.PlayerID);
		}

		LOAD_SCREEN_INFO.currentBlue = LOAD_SCREEN_INFO.teamBlue_playerIds.length;
		LOAD_SCREEN_INFO.currentRed = LOAD_SCREEN_INFO.teamRed_playerIds.length;
		global.Teams.ALL.sendPacket(LOAD_SCREEN_INFO, loadingStages.NOT_CONNECTED);
	}
	static LOAD_NAME(player){
		var LOAD_NAME = createPacket('LOAD_NAME', 'LOADING_SCREEN');
		LOAD_NAME.PlayerId = player._PlayerInfo.PlayerID;
		LOAD_NAME.SkinId = 0;
		LOAD_NAME.playerName = 'Test';
		global.Teams.ALL.sendPacket(LOAD_NAME, loadingStages.NOT_CONNECTED);
	}
	static LOAD_HERO(player){
		var LOAD_HERO = createPacket('LOAD_HERO', 'LOADING_SCREEN');
		LOAD_HERO.PlayerId = player._PlayerInfo.PlayerID;
		LOAD_HERO.SkinId = 0;
		LOAD_HERO.SkinName = global.Units['ALL'].Player[0].character.name;
		global.Teams.ALL.sendPacket(LOAD_HERO, loadingStages.NOT_CONNECTED);
	}
	static connected(player){
		Game.LOAD_SCREEN_INFO(player);
		Game.LOAD_NAME(player);
		Game.LOAD_HERO(player);
	}

	// STAGE client loaded ==========================================================
	static START_GAME(){
		var START_GAME = createPacket('START_GAME');
		START_GAME.bitfield_EnablePause = true;
		global.Teams.ALL.sendPacket(START_GAME, loadingStages.NOT_CONNECTED);
	}
	static GAME_TIMER(time = 0){
		var GAME_TIMER = createPacket('GAME_TIMER');
		GAME_TIMER.SynchTime = time;
		global.Teams.ALL.sendPacket(GAME_TIMER, loadingStages.NOT_CONNECTED);
	}
	static GAME_TIMER_UPDATE(time = 0){
		var GAME_TIMER_UPDATE = createPacket('GAME_TIMER_UPDATE');
		GAME_TIMER_UPDATE.StartTime = time;
		global.Teams.ALL.sendPacket(GAME_TIMER_UPDATE, loadingStages.NOT_CONNECTED);
	}
	static async GameTimeHeartBeat(){
		
		var time = 0;
		for(let i = 0; i < 3; i++){//for(;;){
			Game.GAME_TIMER(time);
	
			await global.Utilities.wait(10 * 1000);
			time += 10;// temporary logic
		}
	}
	// this should be in Game.run
	static async loaded(player){
		Game.START_GAME();
		Game.GameTimeHeartBeat();
		Game.GAME_TIMER_UPDATE();
	}




	// STAGE start game flow ==========================================================
	static initialize(){
		Game.initGame();
	}


	static async run(){
		GameComponents.Spawn();
		//GameComponents.Fountain();//instead of component, create perma buff for fountain turret

	}

	static start(){
		global.Game.started = Date.now() / 1000;
		global.Game.paused = false;
		
		Game.run();
	}

	static async startWhenReady(){
		global.Movement = new GameComponents.MovementSimulation();
		global.Movement.start();

		while(!global.Game.started){
			await global.Utilities.wait(100);

			if(!global.Units.BLUE.Player || Object.keys(global.Units.BLUE.Player).length === 0){
				console.log('[weird] players has been not initialized yet?');
				continue;
			}

			//if(global.Game.initialized + 300 < Date.now() / 1000)
			//	start_game();// start game if 5 minutes passed
			//else{
			//	let playersLoaded = true;
			//	for(let i in global.Units['ALL'].Player){
			//		if(global.Units['ALL'].Player[i].loadingStage < loadingStages.LOADED){
			//			playersLoaded = false;
			//			break;
			//		}
			//	}
			//	if(playersLoaded)
			//		start_game();// or all players has loaded
			//}
			if(global.command_START_GAME)
				Game.start();
		}
		
	}
	static async initGame(){


		global.Game = {
			initialized: Date.now() / 1000,
			started: false,
			paused: true,
		};
		global.Game.Timer = () => {
			//todo: ticker function for setting variables dependent on game time
			if(!global.Game.started)
				return 0;
				
			return Date.now() / 1000 - global.Game.started;
		};

		Game.startWhenReady();
		
	}
}

module.exports = Game;
