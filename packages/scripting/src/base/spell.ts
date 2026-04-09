
import { ChannelingStopSource } from "@repo/gameserver/src/constants/enums";
import type { SlotId, SlotType, SpellbookType } from "@repo/gameserver/src/constants/slot-id";
import { EventEmitter2 } from "@repo/gameserver/src/core/event-emitter2";
import type { BuffInstance, BuffStackInstance } from "@repo/gameserver/src/gameobjectextensions/traits/buff-manager";
import type { Player } from "@repo/gameserver/src/gameobjects/unit-ai";
import { AiSubType } from "@repo/gameserver/src/gameobjects/unit-ai/types";
import type AttackableUnit from "@repo/gameserver/src/gameobjects/units/attackable-unit";
import type { Vector2Like } from "@repo/geometry";
import HashString from "@repo/packets/functions/hash-string";
import type * as packets from "@repo/packets/list";
import { SpellCast, type CastVars } from "../load/spell-cast";


export type SpellSlotData = {
    flags?: number, // TODO

    sealed?: boolean,
    parCostInc?: number, // TODO

    level?: number, // TODO: move here from progressable
    cooldownUntil?: number,
    overrideSpell?: Spell,
};

export type CastData = {
    target?: AttackableUnit,
    targetPosition?: Vector2Like,
    packet: Partial<packets.CastSpellReqModel>;// & Pick<packets.CastSpellReqModel, 'targetNetId'>,
    spell: Spell,

    spellSlot: SlotId,
    spellbookType: SpellbookType,
    slotType: SlotType,
    slotData: SpellSlotData,

    castPosition?: Vector2Like,
    fireWithoutCasting?: boolean,
    isAutoAttack?: boolean,
};

export type BuffVars = any;

export type SpellEvents = {
    'activate': (owner: AttackableUnit) => void;
    'deactivate': (owner: AttackableUnit) => void;
    'buffAdd': (owner: AttackableUnit, buff: BuffInstance) => void;
    'buffRemove': (owner: AttackableUnit, buff: BuffInstance) => void;
    'buffUpdateStats': (owner: AttackableUnit, buff: BuffInstance, stack: BuffStackInstance) => void;
    'buffUpdateActions': (owner: AttackableUnit, buff: BuffInstance, stack: BuffStackInstance) => void;
    'buffActivate': (owner: AttackableUnit, buff: BuffInstance, stack: BuffStackInstance) => void;
    'buffDeactivate': (owner: AttackableUnit, buff: BuffInstance, stack: BuffStackInstance) => void;
}

export default class Spell {

    readonly eventEmitter = new EventEmitter2<SpellEvents>();

    packageHash = 0;
    isMissile = false;
    canCancel = false;

    get name() {
        return this.constructor.name;
    }

    get spellHash() {
        return HashString.HashString(this.name);
    }

    persistsThroughDeath = false;
    canCastWhileDisabled = false;
    cannotBeSuppressed = false;
    cantCastWhileRooted = false;

    /**
     * @virtual
     */
    preCast(owner: AttackableUnit, castData: CastData, castVars: CastVars) {

    }

    /**
     * @virtual
     */
    onCast(owner: AttackableUnit, castData: CastData, castVars: CastVars) {

    }

    /**
     * @virtual
     */
    async postCast(owner: AttackableUnit, castData: CastData, castVars: CastVars) {

    }

    getCastRange(spellLevel: number) {
        // TODO
        return 25000;
    }

    getManaCost(spellLevel: number) {
        // TODO
        return 0;
    }

    getCooldown(spellLevel: number) {
        // TODO
        return 0;
    }

    async cast(owner: AttackableUnit, castData: CastData, onSuccessCast?: () => void) {
        const spell = this;

        const slotData = castData.slotData;
        const overrideSpell = slotData?.overrideSpell;
        if (overrideSpell && spell !== overrideSpell) {
            overrideSpell.cast(owner, {
                ...castData,
                spell: overrideSpell,
            });
            return;
        }

        if (!owner.combat.canCast(spell))
            return;

        const spellNameL = spell.name.toLowerCase();
        (owner.ai as Player).packets?.chatBoxDebugMessage(`spell.cast`, spellNameL);
        owner.moving.sendWaypoints();

        if (!castData.fireWithoutCasting) {
            if (owner.characterState.channeling) {
                try {
                    owner.combat.cancelChanneling(ChannelingStopSource.casting);
                } catch (e) {
                    if (e instanceof Error) {
                        console.error(e.message);
                        return;
                    }
                }
            }
        }

        const spellCast = new SpellCast(spell, owner, castData);
        owner.combat.castingSpell.push(spellCast);

        try {
            //console.log('spell cast', spell.name, '(', HashString.HashString(spell.name), ')', 'at', Math.round(performance.now()));
            await spellCast.castSpell(onSuccessCast);
        }
        catch (e) {
            if (e instanceof Error) {
                console.error('spell.cast.error', e);
                const ai = owner.ai;
                if (ai && ai.subType === AiSubType.Player) {
                    const stackMsg = e.stack?.split('\n')[1];
                    (owner.ai as Player)?.packets?.chatBoxDebugMessage(`cast error: ${e.message} ${stackMsg}`);
                }
            }
        }
        finally {
            const index = owner.combat.castingSpell.indexOf(spellCast!);
            if (index !== -1)
                owner.combat.castingSpell.splice(index, 1);

            (owner.ai as Player).packets?.chatBoxDebugMessage(`spell.cast end`, spellNameL);
        }
    }
}
