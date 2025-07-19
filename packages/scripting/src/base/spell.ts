
import { EventEmitter2 } from "@repo/gameserver/src/core/event-emitter2";
import type AttackableUnit from "@repo/gameserver/src/gameobjects/units/attackable-unit";
import type { Vector2Like } from "@repo/geometry";
import HashString from "@repo/packets/functions/hash-string";
import type * as packets from "@repo/packets/list";


export type CastData = {
    target?: AttackableUnit,
    targetPosition?: Vector2Like,
    packet: Partial<packets.CastSpellReqModel> & Pick<packets.CastSpellReqModel, 'targetNetId'>,
    spell: Spell,

    castPosition?: Vector2Like,
    fireWithoutCasting?: boolean,
};

export type SpellEvents = {
    'activate': (owner: AttackableUnit) => void;
    'deactivate': (owner: AttackableUnit) => void;
    'cast': (owner: AttackableUnit, castData: CastData) => void;
    'buffAdd': (owner: AttackableUnit) => void;
    'buffRemove': (owner: AttackableUnit) => void;
    'buffUpdateActions': (owner: AttackableUnit) => void;
    'buffActivate': (owner: AttackableUnit, attacker?: AttackableUnit, buffVars?: any) => void;
    'buffDeactivate': (owner: AttackableUnit) => void;
}

export default class Spell {

    readonly eventEmitter = new EventEmitter2<SpellEvents>();

    packageHash = 0;
    name: string = '';
    isMissile = false;
    canCancel = false;

    get spellHash() {
        return HashString.HashString(this.name);
    }

    /**
     * @virtual
     */
    preCast(owner: AttackableUnit, castData: CastData, spellVars: any) {

    }

    /**
     * @virtual
     */
    onCast(owner: AttackableUnit, castData: CastData, spellVars: any) {

    }

    /**
     * @virtual
     */
    async postCast(owner: AttackableUnit, castData: CastData, spellVars: any) {

    }

}
