import * as packets from '@repo/packets/list';
import Server from '../../app/server';
import { accurateDelay } from '../../core/timer';
import { TeamId } from '../../gameobjectextensions/traits/team';
import Inhibitor, { type InhibitorOptions } from '../unit-ai/structures/inhibitor';
import Nexus, { type NexusOptions } from '../unit-ai/structures/nexus';
import Turret, { type TurretOptions } from '../unit-ai/structures/turret';
import type AttackableUnit from '../units/attackable-unit';
import Spawner, { type SpawnConfig, type SpawnerOptions } from './spawner';

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
        const { nexuses, inhibitors, turrets } = Server.map.positions;

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

    spawnInhibitors(spawnList: SpawnConfig<InhibitorOptions>[]) {

        for (let i = 0; i < spawnList.length; i++) {
            const spawn = spawnList[i]!;

            const unit = Inhibitor.initializeUnit({
                ...spawn,
                team: this.team.id,
                spawner: this,
            }, spawn.aiOptions);

            unit.spawn();

            unit.combat.respawnable = true;

            unit.eventEmitter.on('death', async (attacker, assists) => {
                const deathTime = 300;

                for (let i = 0; i < deathTime; i++) {
                    await accurateDelay(1000);
                    if (!unit.combat.died)
                        return;
                }

                this.respawnInhibitor(unit);
            });
        }

    }

    respawnInhibitor(unit: AttackableUnit) {
        if (!unit.combat.died)
            return;

        unit.stats.health.current = unit.stats.health.total;
        unit.stats.mana.current = unit.stats.mana.total;
        unit.position.copy(unit.spawnPosition);
        unit.combat.died = 0;

        unit.eventEmitter.emit('resurrect');

        const packet1 = packets.DampenerSwitchStates.create({
            netId: unit.netId,
            isAlive: true,
        });
        unit.packets.toEveryone(packet1);
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
