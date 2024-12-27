import { ReplicantUnitType, type OnReplicationBaseModel, type OnReplicationBuildingModel, type OnReplicationHeroModel, type OnReplicationMinionModel, type OnReplicationMonsterModel, type OnReplicationTurretModel } from '@repo/packets/base/s2cUnreliable/0xC4-OnReplication';
import * as packets from '@repo/packets/list';
import Server from '../app/server';
import loadingStages from '../constants/game-state';
import { TeamId } from '../gameobjects/extensions/traits/team';
import Hero from '../gameobjects/unit-ai/hero';
import Minion from '../gameobjects/unit-ai/minion';
import Monster from '../gameobjects/unit-ai/monster';
import Inhibitor from '../gameobjects/unit-ai/structures/inhibitor';
import Nexus from '../gameobjects/unit-ai/structures/nexus';
import Turret from '../gameobjects/unit-ai/structures/turret';
import type AttackableUnit from '../gameobjects/units/attackable-unit';

/**
 * @todo
 */
export default function create(units: AttackableUnit[]) {
    const replicationUnits = units.map((unit) => {
        const data = {
            netId: unit.netId,
            type: ReplicantUnitType.Base,
        } as OnReplicationBaseModel;

        if (unit.ai instanceof Hero) {
            let spellsEnabled = 0;
            for (let i = 0; i < unit.progress.spellLevel.length; i++) {
                if (unit.progress.spellLevel[i])
                    spellsEnabled |= 1 << Number(i);
            }

            let summonerSpellsEnabled = 0;
            for (let i = 0; i < unit.progress.summonerSpellsEnabled.length; i++) {
                if (unit.progress.summonerSpellsEnabled[i])
                    summonerSpellsEnabled |= 16 << Number(i);
            }

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
                exp: unit.progress.exp,
                mana_current: unit.stats.mana.current,
                mana_total: unit.stats.mana.total,
                attackSpeedMultiplier: 1 + unit.stats.attackSpeed.total - 0.625,
                attackDamage_baseValue: unit.stats.attackDamage.baseTotalValue,
                attackDamage_flatBonus: unit.stats.attackDamage.flatBonusValue,
                attackDamage_percentBonus: unit.stats.attackDamage.percentBonus,
                //actionState: unit.characterState.compressed,
            } satisfies OnReplicationHeroModel;
        }

        if (unit.ai instanceof Turret) {
            return {
                ...data,
                type: ReplicantUnitType.Turret,
            } satisfies OnReplicationTurretModel;
        }

        if (unit.ai instanceof Nexus) {
            return {
                ...data,
                type: ReplicantUnitType.Building,
            } satisfies OnReplicationBuildingModel;
        }

        if (unit.ai instanceof Inhibitor) {
            return {
                ...data,
                type: ReplicantUnitType.Building,
            } satisfies OnReplicationBuildingModel;
        }

        if (unit.ai instanceof Minion) {
            return {
                ...data,
                type: ReplicantUnitType.Minion,
                moveSpeed: unit.stats.moveSpeed.total,
                attackSpeedMultiplier: 1 + unit.stats.attackSpeed.total - 0.625,
            } satisfies OnReplicationMinionModel;
        }

        if (unit.ai instanceof Monster) {
            return {
                ...data,
                type: ReplicantUnitType.Monster,
                moveSpeed: unit.stats.moveSpeed.total,
                attackSpeedMultiplier: 1 + unit.stats.attackSpeed.total - 0.625,
            } satisfies OnReplicationMonsterModel;
        }

        return data;
    });

    return packets.OnReplication.create({
        syncId: performance.now(),
        replicationUnits,
    });
}

export function sendUnitStats(units: AttackableUnit | AttackableUnit[]) {
    if (!Array.isArray(units))
        units = [units];

    const packet1 = create(units);
    Server.teams[TeamId.max]?.sendPacket(packet1, loadingStages.inGame);
}
