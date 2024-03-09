
/**
 * @abstract
 */
export default class _Item {
    id = 0;
    static goldCost = 0;
    static goldSell = 0;
    static stats = {};

    static from: number[] = [];
    isConsumable = false;
    static isStackable = false;
    stacks = 0;
    active = false;
    static isTrinket = false;

    count = 0;
    itemsRemoved: [number, _Item][] = [];
}
