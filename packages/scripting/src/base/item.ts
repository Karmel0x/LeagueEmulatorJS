
import { getItem } from "@repo/gamedata/data/items/ItemList";
import { EventEmitter2 } from "@repo/gameserver/src/core/event-emitter2";
import type AttackableUnit from "@repo/gameserver/src/gameobjects/units/attackable-unit";

export type ItemEvents = {
    'acquire': (owner: AttackableUnit) => void;
    'throw': (owner: AttackableUnit) => void;
    'use': (owner: AttackableUnit, target: AttackableUnit | undefined) => void;
    'buffAdd': (owner: AttackableUnit, attacker: AttackableUnit, buffVars?: any) => void;
    'buffRemove': (target: AttackableUnit) => void;
};

export default class Item {

    readonly eventEmitter = new EventEmitter2<ItemEvents>();

    name: string = '';
    itemId = 0;

    maxStack = 1;
    price = 0;
    canBeSold = true;
    sellMultiplier = 0.7;
    consumable = false;
    isTrinket = false;

    from: number[] | undefined = undefined;

    get recipeItems() {
        if (!this.from)
            return;

        return this.from.map(itemId => getItem(itemId)!);
    }

}
