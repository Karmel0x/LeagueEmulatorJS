import ItemList from "@repo/gamedata/data/items/ItemList";

export function getItem(itemId: string) {
    //const item = new Item();
    //return item;
    return ItemList[itemId];
}
