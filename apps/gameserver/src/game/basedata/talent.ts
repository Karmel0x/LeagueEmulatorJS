
import { EventEmitter2 } from "../../core/event-emitter2";
import type AttackableUnit from "../../gameobjects/units/attackable-unit";

export type TalentEvents = {
    'activate': (owner: AttackableUnit) => void;
    'deactivate': (owner: AttackableUnit) => void;
}

export default class Talent {

    readonly eventEmitter = new EventEmitter2<TalentEvents>();

    name: string = '';

}
