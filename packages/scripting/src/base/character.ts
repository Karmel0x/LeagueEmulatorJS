
import { EventEmitter2 } from "@repo/gameserver/src/core/event-emitter2";
import { IStat, IStatLevelable, IStatStateable } from "@repo/gameserver/src/gameobjectextensions/stats/istat";
import type StatsUnit from "@repo/gameserver/src/gameobjectextensions/stats/unit";
import type AttackableUnit from "@repo/gameserver/src/gameobjects/units/attackable-unit";
import type Spell from "./spell";

export type CharacterEvents = {
    'activate': (owner: AttackableUnit) => void;
    'deactivate': (owner: AttackableUnit) => void;
}

export default class Character {

    static stats: Record<string, any> = {};
    static spells: Record<number, typeof Spell> = {};

    readonly eventEmitter = new EventEmitter2<CharacterEvents>();

    spells: Record<string, Spell> | undefined = this.createSpells();

    get name() {
        return this.constructor.name;
    }

    // placemarkers
    neverRender = false;
    expGivenOnDeath = 0;
    goldGivenOnDeath = 0;
    globalExpGivenOnDeath = 0;
    globalGoldGivenOnDeath = 0;

    get base() {
        return this.constructor as typeof Character;
    }

    createStats(owner: AttackableUnit) {

        const config = this.base.stats;

        const baseAttackSpeed = config.attackSpeed ?? 0.625;
        const attackSpeed = baseAttackSpeed / (config.attackDelayOffset ?? 1);
        const attackSpeedPerLevel = attackSpeed * ((config.attackSpeedPerLevel ?? 0) / 100);

        const stats: Partial<Record<keyof StatsUnit, IStat>> = {
            health: new IStatStateable(owner, config.health, config.healthPerLevel),
            healthRegen: new IStatLevelable(owner, config.healthRegen ?? 0, config.healthRegenPerLevel ?? 0),
            mana: new IStatStateable(owner, config.mana ?? 0, config.manaPerLevel ?? 0),
            manaRegen: new IStatLevelable(owner, config.manaRegen ?? 0, config.manaRegenPerLevel ?? 0),
            attackDamage: new IStatLevelable(owner, config.attackDamage ?? 0, config.attackDamagePerLevel ?? 0),
            abilityPower: new IStatLevelable(owner, config.abilityPower ?? 0, 0),
            armor: new IStatLevelable(owner, config.armor ?? 0, config.armorPerLevel ?? 0),
            magicResist: new IStatLevelable(owner, config.resist ?? 0, config.resistPerLevel ?? 0),
            attackSpeed: new IStatLevelable(owner, attackSpeed, attackSpeedPerLevel),
            critChance: new IStatLevelable(owner, config.crit ?? 0, config.critPerLevel ?? 0),
            attackRange: new IStat(config.attackRange ?? 175),
            moveSpeed: new IStat(config.moveSpeed ?? 325),
            collisionRadius: new IStat(config.collisionRadius ?? 1),
        };

        return stats;
    }

    createSpells() {
        const spells: typeof this.spells = {};
        for (const slot in this.base.spells) {
            const Spell = this.base.spells[slot]!;
            const spell = new Spell();
            spells[slot] = spell;
        }
        return spells;
    }

}
