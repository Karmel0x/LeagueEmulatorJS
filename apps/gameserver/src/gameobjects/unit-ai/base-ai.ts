import type { PacketMessage } from "@repo/network/packets/packet";
import UnitAiList from "../../app/unit-ai-list";
import { EventEmitter2 } from "../../core/event-emitter2";
import AttackableUnit, { type AttackableUnitOptions } from "../units/attackable-unit";
import { AiSubType, AiType } from "./types";

export type BaseAiOptions = {
    owner: AttackableUnit;
};

export type BaseAiEvents = {
};

export default class BaseAi {

    static initialize(options: BaseAiOptions) {
        const object = new this(options);
        object.loader(options);

        object.owner.eventEmitter.once('spawn', () => {
            UnitAiList.add(object);
        });

        object.owner.eventEmitter.once('destroy', () => {
            UnitAiList.remove(object);
            object.eventEmitter.removeAllListeners();
        });

        return object;
    }

    static initializeUnit(unitOptions: AttackableUnitOptions, aiOptions: Omit<BaseAiOptions, 'owner'> = {}) {
        const unit = AttackableUnit.initialize(unitOptions);

        unit.ai = this.initialize({
            owner: unit,
            ...aiOptions,
        });

        return unit;
    }

    get name() {
        return this.constructor.name;
    }

    readonly eventEmitter = new EventEmitter2<BaseAiEvents>();

    readonly owner: AttackableUnit;
    readonly options: BaseAiOptions;
    type = AiType.Base;
    subType = AiSubType.Base;

    constructor(options: BaseAiOptions) {
        this.owner = options.owner;
        this.options = options;
    }

    loader(options: BaseAiOptions) { }

    onSpawnPackets(to: (packet: PacketMessage | undefined) => void) { }
}
