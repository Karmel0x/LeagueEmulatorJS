
const loadingStages = require('../../constants/loadingStages');
const GameComponents = {
	Spawn: require('../components/Spawn'),
	//Fountain: require('../components/Fountain'),
	MovementSimulation: require('../components/MovementSimulation'),
};
const playersConfig = require('../../constants/playersConfig');

const Inhibitor = require("../../gameobjects/units/Inhibitor");
const Nexus = require("../../gameobjects/units/Nexus");
const Turret = require("../../gameobjects/units/Turret");
const Barrack = require("../../gameobjects/spawners/Barrack");
const Player = require("../../gameobjects/units/Player");
const JungleCamp = require('../../gameobjects/spawners/JungleCamp');
const UnitList = require('../../app/UnitList');
const Server = require('../../app/Server');
const Team = require('../../gameobjects/extensions/traits/Team');
const Fountain = require('../../gameobjects/spawners/Fountain');
const Builder = require('../../gameobjects/spawners/Builder');


class Game {
	// STAGE client opened ==========================================================

	/**
	 * Send packet to client about loading state and ping
	 * it's just answer to C2S.Ping_Load_Info
	 * @param {Player} player 
	 * @param {typeof import('../../packets/C2S/0x16-Ping_Load_Info').struct} packet request packet
	 */
	static Ping_Load_Info(player, packet) {
		const Ping_Load_Info = Server.network.createPacket('Ping_Load_Info', 'LOW_PRIORITY');
		Ping_Load_Info.clientId = player.clientId;
		Ping_Load_Info.playerId = player.summoner.id;
		Ping_Load_Info.percentage = packet.percentage;
		Ping_Load_Info.ETA = packet.ETA;
		Ping_Load_Info.count = packet.count;
		Ping_Load_Info.ping = packet.ping;
		Ping_Load_Info.bitfield = {
			ready: packet.bitfield.ready,
		};
		Server.teams[Team.TEAM_MAX].sendPacket(Ping_Load_Info, loadingStages.NOT_CONNECTED);
	}

	/**
	 * Send packet to client to load screen info with info about game
	 * @param {Player} player 
	 */
	static TeamRosterUpdate(player) {
		const TeamRosterUpdate = Server.network.createPacket('TeamRosterUpdate', 'LOADING_SCREEN');
		TeamRosterUpdate.blueMax = 6;
		TeamRosterUpdate.redMax = 6;
		TeamRosterUpdate.teamBlue_playerIds = [];
		TeamRosterUpdate.teamRed_playerIds = [];

		let bluePlayersUnits = /** @type {Player[]} */ (UnitList.getUnitsF(Team.TEAM_BLUE, 'Player'));
		for (let i = 0, l = bluePlayersUnits.length; i < l; i++) {
			let player2 = bluePlayersUnits[i];
			TeamRosterUpdate.teamBlue_playerIds.push(player2.summoner.id);
		}
		let redPlayersUnits = /** @type {Player[]} */ (UnitList.getUnitsF(Team.TEAM_RED, 'Player'));
		for (let i = 0, l = redPlayersUnits.length; i < l; i++) {
			let player2 = redPlayersUnits[i];
			TeamRosterUpdate.teamRed_playerIds.push(player2.summoner.id);
		}

		TeamRosterUpdate.currentBlue = TeamRosterUpdate.teamBlue_playerIds.length;
		TeamRosterUpdate.currentRed = TeamRosterUpdate.teamRed_playerIds.length;
		Server.teams[Team.TEAM_MAX].sendPacket(TeamRosterUpdate, loadingStages.NOT_CONNECTED);
	}

	/**
	 * Send packet to client to show name of player
	 * @param {Player} player 
	 */
	static RequestRename(player) {
		const RequestRename = Server.network.createPacket('RequestRename', 'LOADING_SCREEN');
		RequestRename.playerId = player.summoner.id;
		RequestRename.skinId = 0;
		RequestRename.playerName = 'Test';
		Server.teams[Team.TEAM_MAX].sendPacket(RequestRename, loadingStages.NOT_CONNECTED);
	}

	/**
	 * Send packet to client to show player champion and skin
	 * @param {Player} player 
	 */
	static RequestReskin(player) {
		const RequestReskin = Server.network.createPacket('RequestReskin', 'LOADING_SCREEN');
		RequestReskin.playerId = player.summoner.id;
		RequestReskin.skinId = 0;
		RequestReskin.skinName = player.character.model;
		Server.teams[Team.TEAM_MAX].sendPacket(RequestReskin, loadingStages.NOT_CONNECTED);
	}

	/**
	 * 
	 * @param {Player} player 
	 */
	static connected(player) {
		Game.TeamRosterUpdate(player);
		Game.RequestRename(player);
		Game.RequestReskin(player);
	}

	// STAGE client loaded ==========================================================

	/**
	 * Send packet to client to start game (switch from loading screen to game)
	 */
	static StartGame() {
		const StartGame = Server.network.createPacket('StartGame');
		StartGame.bitfield = {
			enablePause: true,
		};
		Server.teams[Team.TEAM_MAX].sendPacket(StartGame, loadingStages.NOT_CONNECTED);
	}

	/**
	 * Send packet to client to synchronize game time
	 * @param {number} time 
	 */
	static SynchSimTime(time = 0) {
		const SynchSimTime = Server.network.createPacket('SynchSimTime');
		SynchSimTime.synchTime = time;
		Server.teams[Team.TEAM_MAX].sendPacket(SynchSimTime, loadingStages.NOT_CONNECTED);
	}
	static SyncMissionStartTime(time = 0) {
		const SyncMissionStartTime = Server.network.createPacket('SyncMissionStartTime');
		SyncMissionStartTime.startTime = time;
		Server.teams[Team.TEAM_MAX].sendPacket(SyncMissionStartTime, loadingStages.NOT_CONNECTED);
	}

	/**
	 * 
	 * @todo
	 */
	static async GameTimeHeartBeat() {

		let time = 0;
		for (let i = 0; i < 3; i++) {//for(;;){
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
	static async playerLoaded(player) {
		Server.game.loaded = Date.now() / 1000;// this shouldn't be here
		Game.StartGame();
		Game.GameTimeHeartBeat();
		Game.SyncMissionStartTime();
	}

	// STAGE start game flow ==========================================================

	static initialize() {
		Game.initGame();
		Fountain.spawnAll(playersConfig);
	}

	static async run() {
		const SwitchNexusesToOnIdleParticles = Server.network.createPacket('SwitchNexusesToOnIdleParticles');
		Server.teams[Team.TEAM_MAX].sendPacket(SwitchNexusesToOnIdleParticles);

		GameComponents.Spawn();
		//GameComponents.Fountain();//instead of component, create perma buff for fountain turret

	}

	static loaded() {
		Server.game.loaded = Date.now() / 1000;

		Builder.spawnAll();
		Barrack.spawnAll();
		JungleCamp.spawnAll();

	}
	static started() {
		Server.game.started = Date.now() / 1000;
		Server.game.paused = false;

		Game.run();
	}

	static async startWhenReady() {
		//Game.loaded();
		Server.movement = new GameComponents.MovementSimulation();
		Server.movement.start();

		while (!Server.game.started) {
			await Promise.wait(100);

			let playerUnits = UnitList.getUnitsF(Team.TEAM_MAX, 'Player');
			if (!playerUnits || !playerUnits.length) {
				console.log('[weird] players has been not initialized yet?');
				continue;
			}

			//if(Server.game.initialized + 300 < Date.now() / 1000)
			//	start_game();// start game if 5 minutes passed
			//else{
			//	let playersLoaded = true;
			//	let players = UnitList.getUnitsF(Team.TEAM_MAX, 'Player');
			//	for(let i = 0, l = players.length; i < l; i++){
			//		if(players[i].network.loadingStage < loadingStages.LOADED){
			//			playersLoaded = false;
			//			break;
			//		}
			//	}
			//	if(playersLoaded)
			//		start_game();// or all players has loaded
			//}

			// atm we start game with '.start' chat command
			if (Server.command_START_GAME)
				Game.started();
		}

	}

	static async initGame() {


		Server.game = {
			initialized: Date.now() / 1000,
			loaded: false,
			started: false,
			paused: true,
		};
		Server.game.Timer = () => {
			//todo: ticker function for setting variables dependent on game time
			if (!Server.game.started)
				return 0;

			return Date.now() / 1000 - Server.game.started;
		};

		Game.startWhenReady();

	}
}

module.exports = Game;
