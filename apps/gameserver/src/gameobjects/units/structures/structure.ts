
import EventEmitter from 'node:events';
import AttackableUnit, { AttackableUnitEvents, AttackableUnitOptions } from '../attackable-unit';
import TypedEventEmitter from 'typed-emitter';
import Builder from '../../spawners/builder';
import _Building from '../../../game/basedata/characters/building';


export type StructureOptions = AttackableUnitOptions & {

};

export type StructureEvents = AttackableUnitEvents & {

}

export default class Structure extends AttackableUnit {
    static initialize(options: StructureOptions) {
        return super.initialize(options) as Structure;
    }

    eventEmitter = new EventEmitter() as TypedEventEmitter<StructureEvents>;

    declare spawner: Builder;
    declare character: _Building;
}
