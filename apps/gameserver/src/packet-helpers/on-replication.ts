import { ReplicantUnitType, type OnReplicationUnitModel } from '@repo/packets/base/s2cUnreliable/0xC4-OnReplication';
import * as packets from '@repo/packets/list';
import GameObjectList from '../app/game-object-list';
import Server from '../app/server';
import loadingStages from '../constants/game-state';
import { SpellFlag } from '../constants/spell-flags';
import type Teams from '../game/initializers/teams';
import { TeamId } from '../gameobjectextensions/traits/team';
import { LaneMinion, Minion } from '../gameobjects/unit-ai';
import Hero from '../gameobjects/unit-ai/hero';
import NeutralMinion from '../gameobjects/unit-ai/neutral-minion';
import Inhibitor from '../gameobjects/unit-ai/structures/inhibitor';
import Nexus from '../gameobjects/unit-ai/structures/nexus';
import Turret from '../gameobjects/unit-ai/structures/turret';
import type AttackableUnit from '../gameobjects/units/attackable-unit';

/**
 * @todo
 */
export default function create(units: AttackableUnit[], forTeam: TeamId) {
    const replicationUnits = units.map((unit) => {
        const data = {
            unit: unit as any,
            netId: unit.netId,
            type: ReplicantUnitType.Base,
        } as OnReplicationUnitModel;

        if (unit.ai instanceof Hero) {
            let spellsEnabled = 0;
            const spellLevels = unit.progress.spellLevel;
            for (let i = 0; i < spellLevels.length; i++) {
                if (spellLevels[i])
                    spellsEnabled |= 1 << Number(i);
            }

            let summonerSpellsEnabled = 0;
            const summonerSpells = unit.progress.summonerSpellsEnabled;
            for (let i = 0; i < summonerSpells.length; i++) {
                if (summonerSpells[i])
                    summonerSpellsEnabled |= 16 << Number(i);
            }

            return {
                ...data,
                type: ReplicantUnitType.Hero,

                exp: unit.progress.expTotal,
                gold: unit.progress.gold,
                spellsEnabled,
                spellsEnabled_: spellsEnabled ? (spellsEnabled >> 32) : undefined,
                summonerSpellsEnabled,
                summonerSpellsEnabled_: summonerSpellsEnabled ? (summonerSpellsEnabled >> 32) : undefined,

                actionState: unit.characterState.compressed,
                //actionState: ActionStates.defaultStates,
                //isMagicImmune: false,
                isInvulnerable: unit.characterState.invulnerable,
                isTargetable: unit.characterState.targetable,
                //isTargetableToTeam: 0,
                //isPhysicalImmune: false,
                attackDamage_baseValue: unit.stats.attackDamage.baseTotalValue,
                attackDamage_flatBonus: unit.stats.attackDamage.flatBonusValue,
                attackDamage_percentBonus: unit.stats.attackDamage.percentBonus,
                abilityPower_baseValue: unit.stats.abilityPower.baseTotalValue,
                abilityPower_flatBonus: unit.stats.abilityPower.flatBonusValue,
                dodge: unit.stats.dodge.total,
                critChance: unit.stats.critChance.total,
                armor: unit.stats.armor.total,
                magicResist: unit.stats.magicResist.total,
                magicResist_flatBonus: unit.stats.magicResist.flatBonusValue,
                magicResist_percentBonus: unit.stats.magicResist.percentBonus,
                healthRegen: unit.stats.healthRegen.total,
                manaRegen: unit.stats.manaRegen.total,
                attackRange: unit.stats.attackRange.total,
                attackSpeedMultiplier: 1 + unit.stats.attackSpeed.total - 0.625,
                //castRange_flatBonus: 0,
                //cooldownReduction: 0,
                armorPenetration_flatBonus: unit.stats.armorPenetration.flatBonusValue,
                armorPenetration_percentBonus: unit.stats.armorPenetration.percentBonus,
                magicPenetration_flatBonus: unit.stats.magicPenetration.flatBonusValue,
                magicPenetration_percentBonus: unit.stats.magicPenetration.percentBonus,
                lifeSteal: unit.stats.lifeSteal.total,
                spellVamp: unit.stats.spellVamp.total,

                health_current: unit.stats.health.current,
                health_total: unit.stats.health.total,
                mana_current: unit.stats.mana.current,
                mana_total: unit.stats.mana.total,
                //perceptionRange_flatMod: 0,
                //perceptionRange_percentMod: 0,
                moveSpeed: unit.stats.moveSpeed.total,
                //size: 0,
                level: unit.progress.level,
                //debugDrawRadius: 0,
                //monstersKilled: 0,
            } satisfies OnReplicationUnitModel;
        }

        if (unit.ai instanceof Turret) {
            return {
                ...data,
                type: ReplicantUnitType.Turret,
                //actionState: unit.characterState.compressed,
                isInvulnerable: unit.characterState.invulnerable,
                isTargetable: unit.characterState.targetable,
                isTargetableToTeam: SpellFlag.targetableToAll,
            } satisfies OnReplicationUnitModel;
        }

        if (unit.ai instanceof Nexus) {
            return {
                ...data,
                type: ReplicantUnitType.Building,
                health_current: unit.stats.health.current,
                isInvulnerable: unit.characterState.invulnerable,
                isTargetable: unit.characterState.targetable,
                isTargetableToTeam: SpellFlag.targetableToAll,
            } satisfies OnReplicationUnitModel;
        }

        if (unit.ai instanceof Inhibitor) {
            return {
                ...data,
                type: ReplicantUnitType.Building,
                health_current: unit.stats.health.current,
                isInvulnerable: unit.characterState.invulnerable,
                isTargetable: unit.characterState.targetable,
                isTargetableToTeam: SpellFlag.targetableToAll,
            } satisfies OnReplicationUnitModel;
        }

        if (unit.ai instanceof NeutralMinion) {
            return {
                ...data,
                type: ReplicantUnitType.Monster,
                moveSpeed: unit.stats.moveSpeed.total,
                attackSpeedMultiplier: 1 + unit.stats.attackSpeed.total - 0.625,
                actionState: unit.characterState.compressed,
                attackDamage_baseValue: unit.stats.attackDamage.baseTotalValue,
                armor: unit.stats.armor.total,
                resist: unit.stats.magicResist.total,
                attackDamage_flatBonus: unit.stats.attackDamage.flatBonusValue,
                attackDamage_percentBonus: unit.stats.attackDamage.percentBonusValue,
                abilityPower_flatBonus: unit.stats.abilityPower.flatBonusValue,
                healthRegen: unit.stats.healthRegen.total,
                manaRegen: unit.stats.manaRegen.total,
                resist_flatBonus: unit.stats.magicResist.flatBonusValue,
                resist_percentBonus: unit.stats.magicResist.percentBonusValue,
                isInvulnerable: unit.characterState.invulnerable,
                isTargetable: unit.characterState.targetable,
                //isTargetableToTeam: SpellFlag.targetableToAll,
            } satisfies OnReplicationUnitModel;
        }

        if (unit.ai instanceof LaneMinion) {
            return {
                ...data,
                type: ReplicantUnitType.Minion,
                moveSpeed: unit.stats.moveSpeed.total,
                attackSpeedMultiplier: 1 + unit.stats.attackSpeed.total - 0.625,
                actionState: unit.characterState.compressed,
                attackDamage_baseValue: unit.stats.attackDamage.baseTotalValue,
                armor: unit.stats.armor.total,
                resist: unit.stats.magicResist.total,
                attackDamage_flatBonus: unit.stats.attackDamage.flatBonusValue,
                attackDamage_percentBonus: unit.stats.attackDamage.percentBonusValue,
                abilityPower_flatBonus: unit.stats.abilityPower.flatBonusValue,
                healthRegen: unit.stats.healthRegen.total,
                manaRegen: unit.stats.manaRegen.total,
                resist_flatBonus: unit.stats.magicResist.flatBonusValue,
                resist_percentBonus: unit.stats.magicResist.percentBonusValue,
                isInvulnerable: unit.characterState.invulnerable,
                isTargetable: unit.characterState.targetable,
                //isTargetableToTeam: SpellFlag.targetableToAll,
            } satisfies OnReplicationUnitModel;
        }

        if (unit.ai instanceof Minion) {
            let isTargetableToTeam: number | undefined = undefined;
            if (!unit.combat.targetableToAlly && !unit.combat.targetableToEnemy)
                isTargetableToTeam = SpellFlag.nonTargetableAll;
            else if (!unit.combat.targetableToAlly)
                isTargetableToTeam = SpellFlag.nonTargetableAlly;
            else if (!unit.combat.targetableToEnemy)
                isTargetableToTeam = SpellFlag.nonTargetableEnemy;

            return {
                ...data,
                type: ReplicantUnitType.Minion,
                moveSpeed: unit.stats.moveSpeed.total,
                attackSpeedMultiplier: 1 + unit.stats.attackSpeed.total - 0.625,
                actionState: unit.characterState.compressed,
                attackDamage_baseValue: unit.stats.attackDamage.baseTotalValue,
                armor: unit.stats.armor.total,
                resist: unit.stats.magicResist.total,
                attackDamage_flatBonus: unit.stats.attackDamage.flatBonusValue,
                attackDamage_percentBonus: unit.stats.attackDamage.percentBonusValue,
                abilityPower_flatBonus: unit.stats.abilityPower.flatBonusValue,
                healthRegen: unit.stats.healthRegen.total,
                manaRegen: unit.stats.manaRegen.total,
                resist_flatBonus: unit.stats.magicResist.flatBonusValue,
                resist_percentBonus: unit.stats.magicResist.percentBonusValue,
                isInvulnerable: unit.characterState.invulnerable,
                isTargetable: unit.characterState.targetable,
                isTargetableToTeam,
            } satisfies OnReplicationUnitModel;
        }

        return data;
    });

    return packets.OnReplication.create({
        syncId: ++Server.syncId,
        replicationUnits,
        forTeam,
    });
}

export function sendUnitStats(units: AttackableUnit[]) {
    const teamIds = [
        TeamId.chaos,
        TeamId.order,
    ];

    for (let i = 0; i < teamIds.length; i++) {
        const teamId = teamIds[i]!;
        const team = Server.teams[teamId];
        if (!team)
            continue;

        const seenNotAllyUnits = Server.movement.lastSeenUnitsByTeam[teamId] || new Set();
        const unitsToSend = units.filter(unit => unit.team.id === teamId || seenNotAllyUnits.has(unit));
        if (unitsToSend.length < 1)
            continue;

        const packet1 = create(unitsToSend, teamId);
        team.sendPacket(packet1, loadingStages.inGame);
    }
}

export function forceUpdateUnitsStats(units: AttackableUnit[], team: Teams) {
    if (units.length < 1)
        return;

    // TODO: do not send whole packet here, but need to send current state for reconnecting players
    const packet1 = create(units, TeamId.unknown);
    team.sendPacket(packet1, loadingStages.inGame);
}

export function forceUpdateAllUnitsStats(dest: Pick<typeof AttackableUnit.prototype, 'packets' | 'team'>) {
    const units = GameObjectList.attackableUnits;

    const teamId = dest.team.id;
    const seenNotAllyUnits = Server.movement.lastSeenUnitsByTeam[teamId] || new Set();
    const unitsToSend = units.filter(unit => unit.team.id === teamId || seenNotAllyUnits.has(unit));

    while (unitsToSend.length > 0) {
        const units2 = unitsToSend.splice(0, 255);
        const packet1 = create(units2, TeamId.unknown);
        dest.packets.toSelf(packet1, loadingStages.inGame);
    }
}

//export function forceUpdateUnitStats(unit: AttackableUnit, dest: Pick<typeof AttackableUnit.prototype, 'packets' | 'team'>) {
//
//    const teamId = dest.team.id;
//    const team = Server.teams[teamId];
//    if (!team)
//        return;
//
//    const packet1 = create([unit], TeamId.unknown);
//    dest.packets.toSelf(packet1, loadingStages.notConnected);
//}
