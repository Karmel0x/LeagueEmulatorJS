import Team, { TeamId } from '../extensions/traits/team';
import { nexuses, inhibitors, turrets } from '../positions/index';
import Inhibitor, { InhibitorOptions } from '../units/inhibitor';
import Nexus, { NexusOptions } from '../units/nexus';
import Turret, { TurretOptions } from '../units/turret';
import Spawner, { SpawnerOptions } from './spawner';


export type BuilderOptions = SpawnerOptions & {
    nexuses: NexusOptions[];
    inhibitors: InhibitorOptions[];
    turrets: TurretOptions[];
};

/**
 * building spawner (nexus, turret, inhibitor)
 */
export default class Builder extends Spawner {

    static spawnAll() {
        new Builder({
            team: TeamId.order,
            num: 0,
            spawnPosition: { x: 7000, y: 7000 },
            nexuses: nexuses[TeamId.order],
            inhibitors: inhibitors[TeamId.order],
            turrets: turrets[TeamId.order],
        });

        new Builder({
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

    spawnNexuses(spawnList: { [n: number]: NexusOptions; }) {

        for (let num in spawnList) {
            let spawn = spawnList[num];

            Nexus.initialize({
                team: this.team.id,
                num,
                netId: spawn.netId,
                character: spawn.character,
                spawnPosition: spawn.position,
                spawner: this,
            });
        }
    }

    spawnInhibitors(spawnList: { [n: number]: InhibitorOptions; }) {

        for (let num in spawnList) {
            let spawn = spawnList[num];

            Inhibitor.initialize({
                team: this.team.id,
                num,
                netId: spawn.netId,
                character: spawn.character,
                spawnPosition: spawn.position,
                spawner: this,
            });
        }

    }

    spawnTurrets(spawnList: { [n: number]: TurretOptions; }) {

        for (let num in spawnList) {
            let spawn = spawnList[num];

            Turret.initialize({
                team: this.team.id,
                num,
                character: spawn.character,
                spawnPosition: spawn.position,
                info: spawn.info,
                spawner: this,
            });
        }
    }

}
