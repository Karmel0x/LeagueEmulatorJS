import Team from '../extensions/traits/Team.js';
import { nexuses, inhibitors, turrets } from '../positions/index.js';
import Inhibitor from '../units/Inhibitor.js';
import Nexus from '../units/Nexus.js';
import Turret from '../units/Turret.js';
import Spawner from './Spawner.js';


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

    /**
     * @param {import('../GameObjects.js').BuilderOptions} options
     */
    constructor(options) {
        super(options);

        this.spawnNexuses(options.nexuses);
        this.spawnInhibitors(options.inhibitors);
        this.spawnTurrets(options.turrets);
    }

    /**
     * 
     * @param {Object<number, import('../GameObjects.js').NexusOptions>} spawnList
     */
    spawnNexuses(spawnList) {

        for (let num in spawnList) {
            let spawn = spawnList[num];

            new Nexus({
                team: this.team.id,
                num,
                netId: spawn.netId,
                character: spawn.character,
                spawnPosition: spawn.position,
                spawner: this,
            });
        }
    }

    /**
     * 
     * @param {Object<number, import('../GameObjects.js').InhibitorOptions>} spawnList
     */
    spawnInhibitors(spawnList) {

        for (let num in spawnList) {
            let spawn = spawnList[num];

            new Inhibitor({
                team: this.team.id,
                num,
                netId: spawn.netId,
                character: spawn.character,
                spawnPosition: spawn.position,
                spawner: this,
            });
        }

    }
    /**
     * 
     * @param {Object<number, import('../GameObjects.js').TurretOptions>} spawnList
     */
    spawnTurrets(spawnList) {

        for (let num in spawnList) {
            let spawn = spawnList[num];

            new Turret({
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
