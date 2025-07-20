
import { EventEmitter2 } from "@repo/gameserver/src/core/event-emitter2";
import { IStat, IStatLevelable, IStatStateable } from "@repo/gameserver/src/gameobjectextensions/stats/istat";
import type AttackableUnit from "@repo/gameserver/src/gameobjects/units/attackable-unit";
import { pinCastEvents } from "../load/spell-cast";
import type Spell from "./spell";

export type CharacterEvents = {
    'activate': (owner: AttackableUnit) => void;
    'deactivate': (owner: AttackableUnit) => void;
}

export default class Character {

    static stats: Record<string, any> = {};
    static spells: Record<number, typeof Spell> = {};

    readonly eventEmitter = new EventEmitter2<CharacterEvents>();

    name: string = '';
    spells: Record<string, Spell> | undefined = this.createSpells();

    get base() {
        return this.constructor as typeof Character;
    }

    createStats(owner: AttackableUnit) {

        const config = this.base.stats;

        const baseAttackSpeed = /*config.attackSpeed ??*/ 0.625;
        const attackSpeed = baseAttackSpeed / (config.attackDelayOffset ?? 0);
        const attackSpeedPerLevel = attackSpeed * ((config.attackSpeedPerLevel ?? 0) / 100);

        const stats = {
            health: new IStatStateable(owner, config.health, config.healthPerLevel),
            attackSpeed: new IStatLevelable(owner, attackSpeed, attackSpeedPerLevel),
            attackRange: new IStat(config.attackRange),
        };

        return stats;
    }

    createSpells() {
        const spells: typeof this.spells = {};
        for (const slot in this.base.spells) {
            const Spell = this.base.spells[slot]!;
            const spell = new Spell();
            spell.name = Spell.name;
            pinCastEvents(spell);
            spells[slot] = spell;
        }
        return spells;
    }

}
