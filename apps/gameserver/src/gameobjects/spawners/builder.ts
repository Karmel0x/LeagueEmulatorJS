import { TeamId } from '../extensions/traits/team';
import { inhibitors, nexuses, turrets, type SpawnConfig } from '../positions/index';
import Inhibitor, { type InhibitorOptions } from '../unit-ai/structures/inhibitor';
import Nexus, { type NexusOptions } from '../unit-ai/structures/nexus';
import Turret, { type TurretOptions } from '../unit-ai/structures/turret';
import Spawner, { SpawnerOptions } from './spawner';


export type BuilderOptions = SpawnerOptions & {
    nexuses: SpawnConfig<NexusOptions>[];
    inhibitors: SpawnConfig<InhibitorOptions>[];
    turrets: SpawnConfig<TurretOptions>[];
};

/**
 * building spawner (nexus, turret, inhibitor)
 */
export default class Builder extends Spawner {
    static initialize(options: BuilderOptions) {
        return super.initialize(options) as Builder;
    }

    static spawnAll() {
        const builder1 = Builder.initialize({
            team: TeamId.order,
            position: { x: 6500, y: 6500 },
            nexuses: nexuses.filter(nexus => nexus.team === TeamId.order),
            inhibitors: inhibitors.filter(inhibitor => inhibitor.team === TeamId.order),
            turrets: turrets.filter(turret => turret.team === TeamId.order),
        });
        builder1.spawn();

        const builder2 = Builder.initialize({
            team: TeamId.chaos,
            position: { x: 7500, y: 7500 },
            nexuses: nexuses.filter(nexus => nexus.team === TeamId.chaos),
            inhibitors: inhibitors.filter(inhibitor => inhibitor.team === TeamId.chaos),
            turrets: turrets.filter(turret => turret.team === TeamId.chaos),
        });
        builder2.spawn();
    }

    constructor(options: BuilderOptions) {
        super(options);

        this.eventEmitter.once('spawn', () => {
            this.spawnNexuses(options.nexuses);
            this.spawnInhibitors(options.inhibitors);
            this.spawnTurrets(options.turrets);
        });
    }

    spawnNexuses(spawnList: SpawnConfig<NexusOptions>[]) {

        for (let i = 0; i < spawnList.length; i++) {
            const spawn = spawnList[i]!;

            const unit = Nexus.initializeUnit({
                ...spawn,
                team: this.team.id,
                spawner: this,
            }, spawn.aiOptions);

            unit.spawn();
        }
    }

    spawnInhibitors(spawnList: SpawnConfig<TurretOptions>[]) {

        for (let i = 0; i < spawnList.length; i++) {
            const spawn = spawnList[i]!;

            const unit = Inhibitor.initializeUnit({
                ...spawn,
                team: this.team.id,
                spawner: this,
            }, spawn.aiOptions);

            unit.spawn();
        }

    }

    spawnTurrets(spawnList: SpawnConfig<TurretOptions>[]) {

        for (let i = 0; i < spawnList.length; i++) {
            const spawn = spawnList[i]!;

            const unit = Turret.initializeUnit({
                ...spawn,
                team: this.team.id,
                spawner: this,
            }, spawn.aiOptions);

            unit.spawn();
        }
    }

}
