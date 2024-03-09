
import * as packets from '@workspace/packets/packages/packets';
import loadingStages from '../../constants/loading-stages';
import playersConfig from '../../constants/players-config';

import Barrack from '../../gameobjects/spawners/barrack';
import JungleCamp from '../../gameobjects/spawners/jungle-camp';
import Server from '../../app/server';
import { TeamId } from '../../gameobjects/extensions/traits/team';
import Fountain from '../../gameobjects/spawners/fountain';
import Builder from '../../gameobjects/spawners/builder';

import Spawn from '../components/spawn';
import MovementSimulation from '../components/movement-simulation';

import Player from '../../gameobjects/units/player';
import GameObjectList from '../../app/game-object-list';

const GameComponents = {
	Spawn,
	MovementSimulation,
};


export default class Game {
	// STAGE client opened ==========================================================

	/**
	 * Send packet to client about loading state and ping
	 * it's just answer to c2s.Ping_Load_Info
	 */
	static Ping_Load_Info(player: Player, packet: packets.Ping_Load_InfoModel) {
		const packet1 = packets.Ping_Load_InfoS2C.create({
			clientId: player.clientId,
			playerId: player.summoner.id,
			percentage: packet.percentage,
			ETA: packet.ETA,
			count: packet.count,
			ping: packet.ping,
			ready: packet.ready,
		});
		Server.teams[TeamId.max].sendPacket(packet1, loadingStages.notConnected);
	}

	/**
	 * Send packet to client to load screen info with info about game
	 */
	static TeamRosterUpdate(player: Player) {

		let bluePlayers = GameObjectList.players.filter(p => p.team.id == TeamId.order);
		let redPlayers = GameObjectList.players.filter(p => p.team.id == TeamId.chaos);

		const packet1 = packets.TeamRosterUpdate.create({
			maxOrder: 6,
			maxChaos: 6,
			teamOrderPlayerIds: bluePlayers.map(p => p.summoner.id),
			teamChaosPlayerIds: redPlayers.map(p => p.summoner.id),
		});

		Server.teams[TeamId.max].sendPacket(packet1, loadingStages.notConnected);
	}

	/**
	 * Send packet to client to show name of player
	 */
	static RequestRename(player: Player) {
		const packet1 = packets.RequestRename.create({
			playerId: player.summoner.id,
			skinId: 0,
			playerName: 'Test',
		});

		Server.teams[TeamId.max].sendPacket(packet1, loadingStages.notConnected);
	}

	/**
	 * Send packet to client to show player champion and skin
	 */
	static RequestReskin(player: Player) {
		const packet1 = packets.RequestReskin.create({
			playerId: player.summoner.id,
			skinId: 0,
			skinName: player.character?.model,
		});

		Server.teams[TeamId.max].sendPacket(packet1, loadingStages.notConnected);
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
		const packet1 = packets.StartGame.create({
			enablePause: true,
		});

		Server.teams[TeamId.max].sendPacket(packet1, loadingStages.notConnected);
	}

	/**
	 * Send packet to client to synchronize game time
	 */
	static SynchSimTime(time = 0) {
		const packet1 = packets.SynchSimTimeS2C.create({
			time,
		});

		Server.teams[TeamId.max].sendPacket(packet1, loadingStages.notConnected);
	}
	static SyncMissionStartTime(time = 0) {
		const packet1 = packets.SyncMissionStartTime.create({
			time,
		});

		Server.teams[TeamId.max].sendPacket(packet1, loadingStages.notConnected);
	}

	/**
	 * 
	 * @todo
	 */
	static async GameTimeHeartBeat() {

		let time = 0;
		for (let i = 0; i < 3; i++) {//for(;;){
			Game.SynchSimTime(time);

			await Promise.delay(10 * 1000);
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
		const packet1 = packets.SwitchNexusesToOnIdleParticles.create({});
		Server.teams[TeamId.max].sendPacket(packet1);

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
			await Promise.delay(100);

			let players = GameObjectList.players;
			if (!players || players.length < 1) {
				console.error('players has been not initialized');
				continue;
			}

			//if(Server.game.initialized + 300 < Date.now() / 1000)
			//	start_game();// start game if 5 minutes passed
			//else{
			//	let playersLoaded = true;
			//	for(let i = 0, l = players.length; i < l; i++){
			//		if(players[i].network.loadingStage < loadingStages.loaded){
			//			playersLoaded = false;
			//			break;
			//		}
			//	}
			//	if(playersLoaded)
			//		start_game();// or all players has loaded
			//}

			// atm we start game with '.start' chat command
			if (Server.commandStartGame)
				Game.started();
		}

	}

	static async initGame() {


		Server.game = {
			initialized: Date.now() / 1000,
			loaded: 0,
			started: 0,
			paused: true,
		};

		//Server.game.Timer = () => {
		//	//todo: ticker function for setting variables dependent on game time
		//	if (!Server.game.started)
		//		return 0;
		//
		//	return Date.now() / 1000 - Server.game.started;
		//};

		Game.startWhenReady();

	}
}
