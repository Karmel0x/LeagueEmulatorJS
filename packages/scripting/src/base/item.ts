
import { EventEmitter2 } from "@repo/gameserver/src/core/event-emitter2";
import type AttackableUnit from "@repo/gameserver/src/gameobjects/units/attackable-unit";
import type * as packets from '@repo/packets/list';
import { getItem } from "@repo/scripting/load/item";

export type ItemOnSlot = {
    item: Item,
    stacks: number,
};

export type ItemEvents = {
    'acquire': (owner: AttackableUnit, itemOnSlot: ItemOnSlot) => void;
    'throw': (owner: AttackableUnit, itemOnSlot: ItemOnSlot) => void;
    'use': (owner: AttackableUnit, packet: Partial<packets.CastSpellReqModel>, target?: AttackableUnit) => void;
};

export default class Item {

    readonly eventEmitter = new EventEmitter2<ItemEvents>();

    name: string = '';
    itemId = 0;

    maxStack = 1;
    price = 0;
    inStore = true;
    usableInStore = false;
    sellMultiplier = 0.7;
    isTrinket = false;

    consumed = false;
    useEffect = false;

    from?: number[] = undefined;

    get recipeItems() {
        if (!this.from)
            return;

        return this.from.map(itemId => getItem(`${itemId}`)!);
    }

}
