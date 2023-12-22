import { BuilderOptions, InhibitorOptions, NexusOptions, TurretOptions } from '../GameObjects';
import Team from '../extensions/traits/Team';
import { nexuses, inhibitors, turrets } from '../positions/index';
import Inhibitor from '../units/Inhibitor';
import Nexus from '../units/Nexus';
import Turret from '../units/Turret';
import Spawner from './Spawner';


/**
 * building spawner (nexus, turret, inhibitor)
 */
export default class Builder extends Spawner {

    static spawnAll() {
        new Builder({
            team: Team.TEAM_BLUE,
            num: 0,
            spawnPosition: { x: 7000, y: 7000 },
            nexuses: nexuses[Team.TEAM_BLUE],
            inhibitors: inhibitors[Team.TEAM_BLUE],
            turrets: turrets[Team.TEAM_BLUE],
        });

        new Builder({
            team: Team.TEAM_RED,
            num: 0,
            spawnPosition: { x: 7000, y: 7000 },
            nexuses: nexuses[Team.TEAM_RED],
            inhibitors: inhibitors[Team.TEAM_RED],
            turrets: turrets[Team.TEAM_RED],
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
