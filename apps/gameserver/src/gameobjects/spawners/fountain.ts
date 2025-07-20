import * as packets from '@repo/packets/list';
import Server from '../../app/server';
import { accurateDelay } from '../../core/timer';
import { TeamId } from '../../gameobjectextensions/traits/team';
import type { PlayerConfig } from '../unit-ai/player';
import Player from '../unit-ai/player';
import type AttackableUnit from '../units/attackable-unit';
import Spawner, { type SpawnerOptions } from './spawner';


export type PlayerList = Omit<PlayerConfig, 'owner' | 'num'>[];

export type FountainOptions = SpawnerOptions & {
    players: PlayerList;
};

/**
 * player spawner
 */
export default class Fountain extends Spawner {
    static initialize(options: FountainOptions) {
        return super.initialize(options) as Fountain;
    }

    static spawnAll(playerConfig: PlayerList) {
        const { heroes } = Server.map.positions;

        const fountain1 = Fountain.initialize({
            team: TeamId.order,
            position: heroes[TeamId.order]?.[5]?.position,
            players: playerConfig.filter(p => p.match.team === TeamId.order),
        });
        fountain1.spawn();

        const fountain2 = Fountain.initialize({
            team: TeamId.chaos,
            position: heroes[TeamId.chaos]?.[5]?.position,
            players: playerConfig.filter(p => p.match.team === TeamId.chaos),
        });
        fountain2.spawn();
    }

    constructor(options: FountainOptions) {
        super(options);

        this.eventEmitter.once('spawn', () => this.spawnPlayers(options.players));
    }

    spawnPlayers(playersConfig: PlayerList) {
        const { heroes } = Server.map.positions;

        for (let i = 0; i < playersConfig.length; i++) {
            const playerConfig = playersConfig[i];
            if (!playerConfig) continue;

            const team = playerConfig.match.team;

            const unit = Player.initializeUnit({
                character: playerConfig.match.champion,
                position: heroes[team]?.[i]?.position,
                spawner: this,
                team,
                name: playerConfig.summoner.name,
            }, {
                num: i,
                summoner: playerConfig.summoner,
                match: playerConfig.match,
                runes: playerConfig.runes,
                masteries: playerConfig.masteries,
            });

            unit.spawn();
            Server.players.push(unit);

            unit.combat.respawnable = true;

            unit.eventEmitter.on('death', async (attacker, assists) => {
                const deathTime = this.getDeathDuration(unit);

                for (let i = 0; i < deathTime; i++) {
                    await accurateDelay(1000);
                    if (!unit.combat.died)
                        return;
                }

                this.respawn(unit);
            });
        }
    }

    /**
     * in seconds
     */
    getDeathDuration(unit: AttackableUnit) {
        const level = unit.progress.level;
        const deathTimes = Server.map.deathTimes;
        const deathTime = deathTimes[level - 1] || deathTimes[0]!;
        return deathTime;
    }

    respawn(unit: AttackableUnit) {
        if (!unit.combat.died)
            return;

        unit.stats.health.current = unit.stats.health.total;
        unit.stats.mana.current = unit.stats.mana.total;
        unit.position.copy(unit.spawnPosition);
        unit.combat.died = 0;

        unit.eventEmitter.emit('resurrect');

        const packet1 = packets.HeroReincarnate.create({
            netId: unit.netId,
            position: unit.position,
        });
        unit.packets.toEveryone(packet1);
    }

    //onDie(player: Player) {
    //    const respawnTime = this.getRespawnTime(player) ?? 0;
    //    player.scoreboard.respawnAt = Timer.app.now() + respawnTime;
    //    player.scoreboard.totalRespawnTime += respawnTime;
    //    this.respawnWaiter(player, respawnTime);
    //}

}
