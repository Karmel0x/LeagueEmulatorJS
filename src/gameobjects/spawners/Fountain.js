import Team from '../extensions/traits/Team.js';
import Player from '../units/Player.js';
import Spawner from './Spawner.js';
import { players } from '../positions/index.js';


/**
 * player spawner
 */
export default class Fountain extends Spawner {

    /** @type {Fountain[]} */
    static spawners = [];

    /**
     * 
     * @param {import('../GameObjects.js').PlayerConfig[]} players 
     */
    static spawnAll(players) {
        this.spawners.push(new Fountain({
            team: Team.TEAM_BLUE,
            num: 0,
            spawnPosition: { x: 25.9, y: 280 },
            players: players.filter(p => p.match.team === Team.TEAM_BLUE),
        }));

        this.spawners.push(new Fountain({
            team: Team.TEAM_RED,
            num: 0,
            spawnPosition: { x: 13948, y: 14202 },
            players: players.filter(p => p.match.team === Team.TEAM_RED),
        }));
    }

    /**
     * @param {import('../GameObjects.js').FountainOptions} options
     */
    constructor(options) {
        super(options);

        this.spawnPlayers(options.players);
    }

    /**
     * 
     * @param {import('../GameObjects.js').PlayerConfig[]} playersConfig 
     */
    spawnPlayers(playersConfig) {

        for (let num in playersConfig) {
            let playerConfig = playersConfig[num];
            let team = playerConfig.match.team;

            let player = new Player({
                character: playerConfig.match.champion,
                position: players[team][num].position,
                summoner: playerConfig.summoner,
                spawner: this,
                team,
            });

            player.on('die', () => {
                this.onDie(player);
            });

        }
    }

    /**
     * @param {Player} player
     */
    onDie(player) {
        let respawnTime = this.getRespawnTime(player);
        player.scoreboard.respawnAt = performance.now() + respawnTime;
        player.scoreboard.totalRespawnTime += respawnTime;
        this.respawnWaiter(player, respawnTime);
    }

    respawnTimes = [
        0,
    ];

    /**
     * Respawn time in seconds
     * @param {Player} player
     */
    getRespawnTime(player) {
        return this.respawnTimes[player.progress.level] ?? this.respawnTimes[this.respawnTimes.length - 1];
    }

    /**
     * Wait for respawn time to pass to respawn
     * @todo should be in Unit loop ?
     * @param {Player} player
     * @param {number} respawnTime
     */
    async respawnWaiter(player, respawnTime) {
        player.scoreboard.lastRespawnTime = respawnTime || 0;

        if (!player.scoreboard.lastRespawnTime)
            return;

        player.scoreboard.totalRespawnTime += player.scoreboard.lastRespawnTime;
        while (player.died + player.scoreboard.lastRespawnTime < Date.now() / 1000) {
            await Promise.wait(100);
            continue;
        }

        this.respawn(player);
    }

    /**
     * @todo
     * @param {Player} player
     */
    respawn(player) {

    }

}
