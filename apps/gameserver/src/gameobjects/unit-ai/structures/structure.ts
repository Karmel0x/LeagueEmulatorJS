
import Server from '../../../app/server';
import { EventEmitter2 } from '../../../core/event-emitter2';
import type AttackableUnit from '../../units/attackable-unit';
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

    async onDie(source: AttackableUnit, assists: AttackableUnit[]) {
        Server.map.eventEmitter.emit('destroyedStructure', this.owner);
    }

    onSpawn() {
        Server.map.eventEmitter.emit('spawnedStructure', this.owner);
    }
}
