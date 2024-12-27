
import { EventEmitter2 } from '../../../core/event-emitter2';
import BaseAi, { AiType, BaseAiEvents, BaseAiOptions } from '../base-ai';


export type StructureOptions = BaseAiOptions & {

};

export type StructureEvents = BaseAiEvents & {

}

export default class Structure extends BaseAi {
    static initialize(options: StructureOptions) {
        return super.initialize(options) as Structure;
    }

    readonly eventEmitter = new EventEmitter2<StructureEvents>();

    declare options: StructureOptions;
    type = AiType.Building;
}
