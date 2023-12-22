
import packets from '../../packets/index';
import loadingStages from '../../constants/loadingStages';
import playersConfig from '../../constants/playersConfig';

import Barrack from '../../gameobjects/spawners/Barrack';
import JungleCamp from '../../gameobjects/spawners/JungleCamp';
import UnitList from '../../app/UnitList';
import Server from '../../app/Server';
import Team from '../../gameobjects/extensions/traits/Team';
import Fountain from '../../gameobjects/spawners/Fountain';
import Builder from '../../gameobjects/spawners/Builder';

import Spawn from '../components/Spawn';
import MovementSimulation from '../components/MovementSimulation';

import Player from '../../gameobjects/units/Player';
import Ping_Load_Info from '../../packets/C2S/0x16-Ping_Load_Info';

const GameComponents = {
	Spawn,
	MovementSimulation,
};


class Game {
	// STAGE client opened ==========================================================

	/**
	 * Send packet to client about loading state and ping
	 * it's just answer to C2S.Ping_Load_Info
	 */
	static Ping_Load_Info(player: Player, packet: typeof Ping_Load_Info.struct) {
		const packet1 = new packets.Ping_Load_Info();
		packet1.clientId = player.clientId;
		packet1.playerId = player.summoner.id;
		packet1.percentage = packet.percentage;
		packet1.ETA = packet.ETA;
		packet1.count = packet.count;
		packet1.ping = packet.ping;
		packet1.bitfield = {
			ready: packet.bitfield.ready,
		};
		Server.teams[Team.TEAM_MAX].sendPacket(packet1, loadingStages.NOT_CONNECTED);
	}

	/**
	 * Send packet to client to load screen info with info about game
	 */
	static TeamRosterUpdate(player: Player) {
		const packet1 = new packets.TeamRosterUpdate();
		packet1.blueMax = 6;
		packet1.redMax = 6;
		packet1.teamBlue_playerIds = [];
		packet1.teamRed_playerIds = [];

		let bluePlayersUnits = UnitList.getUnitsF(Team.TEAM_BLUE, 'Player') as Player[];
		for (let i = 0, l = bluePlayersUnits.length; i < l; i++) {
			let player2 = bluePlayersUnits[i];
			packet1.teamBlue_playerIds.push(player2.summoner.id);
		}
		let redPlayersUnits = UnitList.getUnitsF(Team.TEAM_RED, 'Player') as Player[];
		for (let i = 0, l = redPlayersUnits.length; i < l; i++) {
			let player2 = redPlayersUnits[i];
			packet1.teamRed_playerIds.push(player2.summoner.id);
		}

		packet1.currentBlue = packet1.teamBlue_playerIds.length;
		packet1.currentRed = packet1.teamRed_playerIds.length;
		Server.teams[Team.TEAM_MAX].sendPacket(packet1, loadingStages.NOT_CONNECTED);
	}

	/**
	 * Send packet to client to show name of player
	 */
	static RequestRename(player: Player) {
		const packet1 = new packets.RequestRename();
		packet1.playerId = player.summoner.id;
		packet1.skinId = 0;
		packet1.playerName = 'Test';
		Server.teams[Team.TEAM_MAX].sendPacket(packet1, loadingStages.NOT_CONNECTED);
	}

	/**
	 * Send packet to client to show player champion and skin
	 */
	static RequestReskin(player: Player) {
		const packet1 = new packets.RequestReskin();
		packet1.playerId = player.summoner.id;
		packet1.skinId = 0;
		packet1.skinName = player.character.model;
		Server.teams[Team.TEAM_MAX].sendPacket(packet1, loadingStages.NOT_CONNECTED);
	}

	static connected(player: Player) {
		Game.TeamRosterUpdate(player);
		Game.RequestRename(player);
		Game.RequestReskin(player);
	}

	// STAGE client loaded ==========================================================

	/**
	 * Send packet to client to start game (switch from loading screen to game)
	 */
	static StartGame() {
		const packet1 = new packets.StartGame();
		packet1.bitfield = {
			enablePause: true,
		};
		Server.teams[Team.TEAM_MAX].sendPacket(packet1, loadingStages.NOT_CONNECTED);
	}

	/**
	 * Send packet to client to synchronize game time
	 */
	static SynchSimTime(time = 0) {
		const packet1 = new packets.SynchSimTime();
		packet1.synchTime = time;
		Server.teams[Team.TEAM_MAX].sendPacket(packet1, loadingStages.NOT_CONNECTED);
	}
	static SyncMissionStartTime(time = 0) {
		const packet1 = new packets.SyncMissionStartTime();
		packet1.startTime = time;
		Server.teams[Team.TEAM_MAX].sendPacket(packet1, loadingStages.NOT_CONNECTED);
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
	 */
	static async playerLoaded(player: Player) {
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
		const packet1 = new packets.SwitchNexusesToOnIdleParticles();
		Server.teams[Team.TEAM_MAX].sendPacket(packet1);

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
				//throw new Error('players has been not initialized yet?');
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

export default Game;
