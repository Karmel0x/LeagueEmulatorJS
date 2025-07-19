
import { EventEmitter2 } from '../../../core/event-emitter2';
import BaseAi, { type BaseAiEvents, type BaseAiOptions } from '../base-ai';
import { AiType } from '../types';


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
