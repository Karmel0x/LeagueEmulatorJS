
const loadingStages = require('../../Constants/loadingStages');
var GameComponents = {
	Spawn: require('../Components/Spawn'),
	//Fountain: require('../Components/Fountain'),
	MovementSimulation: require('../Components/MovementSimulation'),
};
var playersConfig = require('../../Constants/playersConfig');
const { createPacket } = require('../../Core/PacketUtilities');

const Inhibitor = require("../../GameObjects/Units/Inhibitor");
const Nexus = require("../../GameObjects/Units/Nexus");
const Turret = require("../../GameObjects/Units/Turret");
const Barrack = require("../../GameObjects/Others/Barrack");
const Player = require("../../GameObjects/Units/Player");

class Game {
	// STAGE client opened ==========================================================

	/**
	 * Send packet to client about loding state and ping
	 * it's just answer to C2S.Ping_Load_Info
	 * @param {Player} player 
	 * @param {Object} packet request packet
	 */
	static Ping_Load_Info(player, packet){
		var Ping_Load_Info = createPacket('Ping_Load_Info', 'LOW_PRIORITY');
		Ping_Load_Info.clientId = player.info.clientId;
		Ping_Load_Info.playerId = player.info.playerId;
		Ping_Load_Info.percentage = packet.percentage;
		Ping_Load_Info.ETA = packet.ETA;
		Ping_Load_Info.count = packet.count;
		Ping_Load_Info.ping = packet.ping;
		Ping_Load_Info.bitfield = {
			ready: packet.bitfield.ready,
		};
		global.Teams.ALL.sendPacket(Ping_Load_Info, loadingStages.NOT_CONNECTED);
	}

	/**
	 * Send packet to client to load screen info with info about game
	 * @param {Player} player 
	 */
	static TeamRosterUpdate(player){
		var TeamRosterUpdate = createPacket('TeamRosterUpdate', 'LOADING_SCREEN');
		TeamRosterUpdate.blueMax = 6;
		TeamRosterUpdate.redMax = 6;
		TeamRosterUpdate.teamBlue_playerIds = [];
		TeamRosterUpdate.teamRed_playerIds = [];
		
		var bluePlayersUnits = global.getUnitsF('BLUE', 'Player');
		for(let player_num in bluePlayersUnits){
			var player = bluePlayersUnits[player_num];
			TeamRosterUpdate.teamBlue_playerIds.push(player.info.playerId);
		}
		var redPlayersUnits = global.getUnitsF('RED', 'Player');
		for(let player_num in redPlayersUnits){
			var player = redPlayersUnits[player_num];
			TeamRosterUpdate.teamRed_playerIds.push(player.info.playerId);
		}

		TeamRosterUpdate.currentBlue = TeamRosterUpdate.teamBlue_playerIds.length;
		TeamRosterUpdate.currentRed = TeamRosterUpdate.teamRed_playerIds.length;
		global.Teams.ALL.sendPacket(TeamRosterUpdate, loadingStages.NOT_CONNECTED);
	}

	/**
	 * Send packet to client to show name of player
	 * @param {Player} player 
	 */
	static RequestRename(player){
		var RequestRename = createPacket('RequestRename', 'LOADING_SCREEN');
		RequestRename.playerId = player.info.playerId;
		RequestRename.skinId = 0;
		RequestRename.playerName = 'Test';
		global.Teams.ALL.sendPacket(RequestRename, loadingStages.NOT_CONNECTED);
	}

	/**
	 * Send packet to client to show player champion and skin
	 * @param {Player} player 
	 */
	static RequestResking(player){
		var RequestResking = createPacket('RequestResking', 'LOADING_SCREEN');
		RequestResking.playerId = player.info.playerId;
		RequestResking.skinId = 0;
		RequestResking.skinName = player.character.model;
		global.Teams.ALL.sendPacket(RequestResking, loadingStages.NOT_CONNECTED);
	}

	static connected(player){
		Game.TeamRosterUpdate(player);
		Game.RequestRename(player);
		Game.RequestResking(player);
	}

	// STAGE client loaded ==========================================================

	/**
	 * Send packet to client to start game (switch from loading screen to game)
	 */
	static StartGame(){
		var StartGame = createPacket('StartGame');
		StartGame.bitfield = {
			enablePause: true,
		};
		global.Teams.ALL.sendPacket(StartGame, loadingStages.NOT_CONNECTED);
	}

	/**
	 * Send packet to client to synchronize game time
	 * @param {Number} time 
	 */
	static SynchSimTime(time = 0){
		var SynchSimTime = createPacket('SynchSimTime');
		SynchSimTime.synchTime = time;
		global.Teams.ALL.sendPacket(SynchSimTime, loadingStages.NOT_CONNECTED);
	}
	static SyncMissionStartTime(time = 0){
		var SyncMissionStartTime = createPacket('SyncMissionStartTime');
		SyncMissionStartTime.startTime = time;
		global.Teams.ALL.sendPacket(SyncMissionStartTime, loadingStages.NOT_CONNECTED);
	}

	/**
	 * 
	 * @todo
	 */
	static async GameTimeHeartBeat(){
		
		var time = 0;
		for(let i = 0; i < 3; i++){//for(;;){
			Game.SynchSimTime(time);
	
			await Promise.wait(10 * 1000);
			time += 10;
		}
	}

	/**
	 * 
	 * @todo should be in Game.run
	 * @param {Player} player 
	 */
	static async playerLoaded(player){
		global.Game.loaded = Date.now() / 1000;// this shouldn't be here
		Game.StartGame();
		Game.GameTimeHeartBeat();
		Game.SyncMissionStartTime();
	}

	// STAGE start game flow ==========================================================

	static initialize(){
		Game.initGame();
		Player.spawnAll(playersConfig);
	}

	static async run(){
		GameComponents.Spawn();
		//GameComponents.Fountain();//instead of component, create perma buff for fountain turret

	}

	static loaded(){
		global.Game.loaded = Date.now() / 1000;
		
		Nexus.spawnAll();
		Inhibitor.spawnAll();
		Turret.spawnAll();
		Barrack.spawnAll();

	}
	static started(){
		global.Game.started = Date.now() / 1000;
		global.Game.paused = false;
		
		Game.run();
	}

	static async startWhenReady(){
		//Game.loaded();
		global.Movement = new GameComponents.MovementSimulation();
		global.Movement.start();

		while(!global.Game.started){
			await Promise.wait(100);

			var playerUnits = global.getUnitsF('ALL', 'Player');
			if(!playerUnits || !playerUnits.length){
				console.log('[weird] players has been not initialized yet?');
				continue;
			}

			//if(global.Game.initialized + 300 < Date.now() / 1000)
			//	start_game();// start game if 5 minutes passed
			//else{
			//	let playersLoaded = true;
			//	var players = global.getUnitsF('ALL', 'Player');
			//	for(let i in players){
			//		if(players[i].loadingStage < loadingStages.LOADED){
			//			playersLoaded = false;
			//			break;
			//		}
			//	}
			//	if(playersLoaded)
			//		start_game();// or all players has loaded
			//}

			// atm we start game with '.start' chat command
			if(global.command_START_GAME)
				Game.started();
		}
		
	}
	static async initGame(){


		global.Game = {
			initialized: Date.now() / 1000,
			loaded: false,
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
