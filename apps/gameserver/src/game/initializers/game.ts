
import * as packets from '@repo/packets/list';
import Server from '../../app/server';
import loadingStages from '../../constants/game-state';
import { EventEmitter2 } from '../../core/event-emitter2';
import Timer from '../../core/timer';
import { delay } from '../../core/utils';
import { TeamId } from '../../gameobjects/extensions/traits/team';
import Barrack from '../../gameobjects/spawners/barrack';
import Builder from '../../gameobjects/spawners/builder';
import Fountain, { type PlayerList } from '../../gameobjects/spawners/fountain';
import JungleCamp from '../../gameobjects/spawners/jungle-camp';
import type Player from '../../gameobjects/unit-ai/player';
import AmbientGain from '../components/ambient-gain';
import MovementSimulation from '../components/movement-simulation';
import config from '../game.config.json';
import '../game.config.schema.json';

const GameComponents = {
	MovementSimulation,
	AmbientGain,
};

export type GameEvents = {
	//'playerStartSpawn': (player: Player) => void;
};

export default class Game {

	static readonly eventEmitter = new EventEmitter2<GameEvents>();

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
		Server.teams[TeamId.max]?.sendPacket(packet1, loadingStages.notConnected, loadingStages.loaded);
	}

	/**
	 * Send packet to client to load screen info with info about game
	 */
	static TeamRosterUpdate(player: Player) {

		const players = Server.players.map(player => player.ai as Player);

		const bluePlayers = players.filter(p => p.owner.team.id === TeamId.order);
		const redPlayers = players.filter(p => p.owner.team.id === TeamId.chaos);

		const packet1 = packets.TeamRosterUpdate.create({
			maxOrder: 6,
			maxChaos: 6,
			teamOrderPlayerIds: bluePlayers.map(p => p.summoner.id),
			teamChaosPlayerIds: redPlayers.map(p => p.summoner.id),
		});

		Server.teams[TeamId.max]?.sendPacket(packet1, loadingStages.notConnected);
	}

	/**
	 * Send packet to client to show name of player
	 */
	static RequestRename(player: Player) {
		const packet1 = packets.RequestRename.create({
			playerId: player.summoner.id,
			skinId: 0,
			playerName: player.summoner.name,
		});

		Server.teams[TeamId.max]?.sendPacket(packet1, loadingStages.notConnected);
	}

	/**
	 * Send packet to client to show player champion and skin
	 */
	static RequestReskin(player: Player) {
		const packet1 = packets.RequestReskin.create({
			playerId: player.summoner.id,
			skinId: 0,
			skinName: player.owner.skin,
		});

		Server.teams[TeamId.max]?.sendPacket(packet1, loadingStages.notConnected);
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
	static StartGame(player: Player) {
		const packet1 = packets.StartGame.create({
			enablePause: true,
		});

		//Server.teams[TeamId.max]?.sendPacket(packet1, loadingStages.notConnected);
		player.network.sendPacket(packet1, loadingStages.notConnected);
	}

	/**
	 * Send packet to client to synchronize game time
	 */
	static SynchSimTime(player: Player, ms = 0) {
		const packet1 = packets.SynchSimTimeS2C.create({
			time: Math.round(ms / 1000),
		});

		player.network.sendPacket(packet1, loadingStages.notConnected);
	}

	static SyncMissionStartTime(player: Player, ms = 0) {
		const packet1 = packets.SyncMissionStartTime.create({
			time: Math.round(ms / 1000),
		});

		player.network.sendPacket(packet1, loadingStages.notConnected);
	}

	/**
	 * @todo check when and how many times this should be sent
	 */
	static async GameTimeHeartBeat(player: Player) {
		for (let i = 0; i < 3; i++) {
			let time = Server.game.timer.now();

			// @todo remove this
			if (!time)
				time = Timer.app.now();

			Game.SynchSimTime(player, time);
			await delay(10 * 1000);
		}
	}

	static async resolveOnGameLoaded() {
		for (; ;) {
			if (Server.game.loaded)
				return;

			await delay(100);
		}
	}

	static async resolveOnGameStarted() {
		for (; ;) {
			if (Server.game.started)
				return;

			await delay(100);
		}
	}

	static async playerLoaded(player: Player) {
		// @todo also wait for game start?
		await this.resolveOnGameLoaded();
		Game.StartGame(player);
		Game.GameTimeHeartBeat(player);
		Game.SyncMissionStartTime(player);
	}

	// STAGE start game flow ==========================================================

	static initialize() {
		Server.game = new Game();
		Server.game.initialize();
		Fountain.spawnAll(config.players as PlayerList);
	}


	static async run() {

		//GameComponents.Fountain();//instead of component, create perma buff for fountain turret

		const ambientGain = new GameComponents.AmbientGain();
		ambientGain.start();

	}

	static loaded() {
		if (Server.game.loaded)
			return;

		Server.game.loaded = Timer.app.now();

		Builder.spawnAll();
		Barrack.spawnAll();
		JungleCamp.spawnAll();

	}

	static started() {
		if (Server.game.started)
			return;

		Server.game.start();

		this.run();
	}

	static checkPlayersLoaded() {
		if (Server.game.loaded)
			return true;

		// start game if 5 minutes passed
		const passed = Timer.app.now() - Server.game.initialized;
		if (passed > 300 * 1000)
			return true;

		// or all players which connected has loaded
		let players = Server.players.map(player => player.ai as Player);

		// @todo wait for players which didn't connected too
		players = players.filter(player => player.network.loadingStage >= loadingStages.loading);
		if (players.length < 1)
			return false;

		for (let i = 0, l = players.length; i < l; i++) {
			const player = players[i]!;

			if (player.network.loadingStage < loadingStages.loaded)
				return false;
		}

		return true;
	}

	static async startWhenReady() {
		// @todo this should be after game loaded
		Server.movement = new GameComponents.MovementSimulation();
		Server.movement.start();

		while (!Server.game.loaded) {
			await delay(100);

			const players = Server.players;
			if (!players || players.length < 1) {
				console.error('players has been not initialized');
				continue;
			}

			//if (this.checkPlayersLoaded()) {
			this.loaded();
			break;
			//}
		}

		while (!Server.game.started) {
			await delay(100);

			// atm we start game with '.start' chat command
			if (Server.commandStartGame) {
				Game.started();
				break;
			}
		}

	}

	initialized = 0;
	loaded = 0;
	started = 0;
	timer = new Timer().notYet();

	initialize() {
		this.initialized = Timer.app.now();
		Game.startWhenReady();
	}

	start() {
		this.started = Timer.app.now();
		this.timer.start();

		// @todo remove this
		Server.players.forEach(unit => {
			Game.GameTimeHeartBeat(unit.ai as Player);
			Game.SyncMissionStartTime(unit.ai as Player);
		});
	}
}
