import { TeamId } from '../extensions/traits/team';
import Player, { PlayerOptions } from '../units/player';
import Spawner, { SpawnerOptions } from './spawner';
import { players } from '../positions/index';
import type { PlayerConfig } from '../units/player';


export type FountainOptions = SpawnerOptions & {
    players: PlayerConfig[];
};

/**
 * player spawner
 */
export default class Fountain extends Spawner {
    static initialize(options: FountainOptions) {
        return super.initialize(options) as Fountain;
    }

    static spawnAll(players: PlayerConfig[]) {
        Fountain.initialize({
            team: TeamId.order,
            num: 0,
            spawnPosition: { x: 25.9, y: 280 },
            players: players.filter(p => p.match.team === TeamId.order),
        });

        Fountain.initialize({
            team: TeamId.chaos,
            num: 0,
            spawnPosition: { x: 13948, y: 14202 },
            players: players.filter(p => p.match.team === TeamId.chaos),
        });
    }

    constructor(options: FountainOptions) {
        super(options);

        this.spawnPlayers(options.players);
    }

    spawnPlayers(playersConfig: PlayerConfig[]) {

        for (let num in playersConfig) {
            let playerConfig = playersConfig[num];
            let team = playerConfig.match.team;

            Player.initialize({
                character: playerConfig.match.champion,
                position: players[team][num].position,
                summoner: playerConfig.summoner,
                spawner: this,
                team,
            });

        }
    }

    onDie(player: Player) {
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
     */
    getRespawnTime(player: Player) {
        return this.respawnTimes[player.progress.level] ?? this.respawnTimes[this.respawnTimes.length - 1];
    }

    /**
     * Wait for respawn time to pass to respawn
     * @todo should be in Unit loop ?
     */
    async respawnWaiter(player: Player, respawnTime: number) {
        player.scoreboard.lastRespawnTime = respawnTime || 0;

        if (!player.scoreboard.lastRespawnTime)
            return;

        player.scoreboard.totalRespawnTime += player.scoreboard.lastRespawnTime;
        while (player.combat.died + player.scoreboard.lastRespawnTime < Date.now() / 1000) {
            await Promise.delay(100);
            continue;
        }

        this.respawn(player);
    }

    /**
     * @todo
     */
    respawn(player: Player) {

    }

}
