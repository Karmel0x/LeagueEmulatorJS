
import type GameObject from '../../game-object';


export type TargetableEvents = {

};

/**
 * Trait for units that can be attacked
 */
export default class Targetable {
    readonly owner;

    constructor(owner: GameObject) {
        this.owner = owner;
    }

}
