import { TeamId } from '../extensions/traits/team';
import { nexuses, inhibitors, turrets, SpawnConfigByTeam } from '../positions/index';
import Inhibitor, { InhibitorOptions } from '../units/structures/inhibitor';
import Nexus, { NexusOptions } from '../units/structures/nexus';
import Turret, { TurretOptions } from '../units/structures/turret';
import Spawner, { SpawnerOptions } from './spawner';


export type BuilderOptions = SpawnerOptions & {
    nexuses: SpawnConfigByTeam<NexusOptions>;
    inhibitors: SpawnConfigByTeam<InhibitorOptions>;
    turrets: SpawnConfigByTeam<TurretOptions>;
};

/**
 * building spawner (nexus, turret, inhibitor)
 */
export default class Builder extends Spawner {
    static initialize(options: BuilderOptions) {
        return super.initialize(options) as Builder;
    }

    static spawnAll() {
        Builder.initialize({
            team: TeamId.order,
            num: 0,
            spawnPosition: { x: 7000, y: 7000 },
            nexuses: nexuses[TeamId.order],
            inhibitors: inhibitors[TeamId.order],
            turrets: turrets[TeamId.order],
        });

        Builder.initialize({
            team: TeamId.chaos,
            num: 0,
            spawnPosition: { x: 7000, y: 7000 },
            nexuses: nexuses[TeamId.chaos],
            inhibitors: inhibitors[TeamId.chaos],
            turrets: turrets[TeamId.chaos],
        });
    }

    constructor(options: BuilderOptions) {
        super(options);

        this.spawnNexuses(options.nexuses);
        this.spawnInhibitors(options.inhibitors);
        this.spawnTurrets(options.turrets);
    }

    spawnNexuses(spawnList: SpawnConfigByTeam<NexusOptions>) {

        for (let num in spawnList) {
            let spawn = spawnList[num];

            Nexus.initialize({
                team: this.team.id,
                num: Number(num),
                netId: spawn.netId,
                character: spawn.character,
                spawnPosition: spawn.position,
                info: spawn.info,
                spawner: this,
            });
        }
    }

    spawnInhibitors(spawnList: SpawnConfigByTeam<InhibitorOptions>) {

        for (let num in spawnList) {
            let spawn = spawnList[num];

            Inhibitor.initialize({
                team: this.team.id,
                num: Number(num),
                netId: spawn.netId,
                character: spawn.character,
                spawnPosition: spawn.position,
                info: spawn.info,
                spawner: this,
            });
        }

    }

    spawnTurrets(spawnList: SpawnConfigByTeam<TurretOptions>) {

        for (let num in spawnList) {
            let spawn = spawnList[num];

            Turret.initialize({
                team: this.team.id,
                num: Number(num),
                character: spawn.character,
                spawnPosition: spawn.position,
                info: spawn.info,
                spawner: this,
            });
        }
    }

}
