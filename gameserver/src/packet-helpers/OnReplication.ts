import * as packets from '@workspace/packets/packages/packets';
import { type OnReplicationBuildingModel, type OnReplicationBaseModel, type OnReplicationMinionModel, type OnReplicationHeroModel, type OnReplicationTurretModel, type OnReplicationUnitModel, ReplicantUnitType, OnReplicationMonsterModel } from '@workspace/packets/packages/packets/base/s2cUnreliable/0xC4-OnReplication';
import type Unit from '../gameobjects/units/unit';
import Hero from '../gameobjects/units/hero';
import Turret from '../gameobjects/units/turret';
import Minion from '../gameobjects/units/minion';
import Monster from '../gameobjects/units/monster';
import Nexus from '../gameobjects/units/nexus';
import Inhibitor from '../gameobjects/units/inhibitor';
import Server from '../app/server';
import { TeamId } from '../gameobjects/extensions/traits/team';
import loadingStages from '../constants/loading-stages';

/**
 * @todo
 */
export default function create(units: Unit[]) {
    const replicationUnits = units.map((unit) => {
        let data = {
            netId: unit.netId,
            type: ReplicantUnitType.Base,
        } as OnReplicationBaseModel;

        if (unit instanceof Hero) {
            let spellsEnabled = 0;
            for (let i in unit.progress.spellLevel)
                if (unit.progress.spellLevel[i])
                    spellsEnabled |= 1 << Number(i);

            let summonerSpellsEnabled = 0;
            for (let i in unit.progress.summonerSpellsEnabled)
                if (unit.progress.summonerSpellsEnabled[i])
                    summonerSpellsEnabled |= 16 << Number(i);

            return {
                ...data,
                type: ReplicantUnitType.Hero,
                gold: unit.progress.gold,
                level: unit.progress.level,
                spellsEnabled,
                spellsEnabled_: spellsEnabled ? (spellsEnabled >> 32) : undefined,
                summonerSpellsEnabled,
                summonerSpellsEnabled_: summonerSpellsEnabled ? (summonerSpellsEnabled >> 32) : undefined,
                moveSpeed: unit.stats.moveSpeed.total,
                health_total: unit.stats.health.total,
                health_current: unit.stats.health.current,
            } as OnReplicationHeroModel;
        }

        if (unit instanceof Turret) {
            return {
                ...data,
                type: ReplicantUnitType.Turret,
            } as OnReplicationTurretModel;
        }

        if (unit instanceof Nexus) {
            return {
                ...data,
                type: ReplicantUnitType.Building,
            } as OnReplicationBuildingModel;
        }

        if (unit instanceof Inhibitor) {
            return {
                ...data,
                type: ReplicantUnitType.Building,
            } as OnReplicationBuildingModel;
        }

        if (unit instanceof Minion) {
            return {
                ...data,
                type: ReplicantUnitType.Minion,
            } as OnReplicationMinionModel;
        }

        if (unit instanceof Monster) {
            return {
                ...data,
                type: ReplicantUnitType.Monster,
            } as OnReplicationMonsterModel;
        }

        return data;
    });

    return packets.OnReplication.create({
        syncId: performance.now(),
        replicationUnits,
    });
}

export function sendUnitStats(units: Unit | Unit[]) {
    if (!Array.isArray(units))
        units = [units];

    const packet1 = create(units);
    Server.teams[TeamId.max].sendPacket(packet1, loadingStages.inGame);
}
