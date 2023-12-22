import Team from '../extensions/traits/Team';
import Player from '../units/Player';
import Spawner from './Spawner';
import { players } from '../positions/index';
import { FountainOptions, PlayerConfig } from '../GameObjects';


/**
 * player spawner
 */
export default class Fountain extends Spawner {

    static spawners: Fountain[] = [];

    static spawnAll(players: PlayerConfig[]) {
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

    constructor(options: FountainOptions) {
        super(options);

        this.spawnPlayers(options.players);
    }

    spawnPlayers(playersConfig: PlayerConfig[]) {

        for (let num in playersConfig) {
            let playerConfig = playersConfig[num];
            let team = playerConfig.match.team;

            let player = Player.initialize({
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
        while (player.died + player.scoreboard.lastRespawnTime < Date.now() / 1000) {
            await Promise.wait(100);
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
