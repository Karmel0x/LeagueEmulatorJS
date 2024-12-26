
import GameObject, { GameObjectEvents } from '../../game-object';
import TypedEventEmitter from 'typed-emitter';


export type TargetableEvents = GameObjectEvents & {

};

export interface ITargetable extends GameObject {
    eventEmitter: TypedEventEmitter<TargetableEvents>;
    combat: Targetable;
}

/**
 * Trait for units that can be attacked
 */
export default class Targetable {
    owner;

    constructor(owner: ITargetable) {
        this.owner = owner;
    }

}
