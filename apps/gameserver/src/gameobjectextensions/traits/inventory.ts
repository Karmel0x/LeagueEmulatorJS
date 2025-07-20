
import { getItem } from '@repo/gamedata/data/items/ItemList';
import * as packets from '@repo/packets/list';
import type Item from '@repo/scripting/base/item';
import type AttackableUnit from '../../gameobjects/units/attackable-unit';
import { sendUnitStats } from '../../packet-helpers/on-replication';


const ItemSlots = 6;// 0-5
const TrinketSlot = 6;
//const ExtraItemSlots = 6;// 7-12
//const ExtraTrinketSlot = 13;
//const RuneSlots = 30;// 14-44

type ItemOnSlot = {
	item: Item,
	stacks: number,
};

//export class UndoHistory {
//	static ACTION_LIST = {
//		SELL: 0,
//		BUY: 1,
//		BUILD_ITEM: 2,
//	};
//
//	parent;
//	owner;
//	history: { itemId: number, slot: number, action: number }[] = [];
//
//	constructor(parent: Inventory) {
//		this.parent = parent;
//		this.owner = parent.owner;
//
//	}
//
//	alternateUndoEnable() {
//		const player = this.owner;
//		const packet1 = packets.SetUndoEnabled.create({
//			netId: player.netId,
//			undoStackSize: this.history.length,
//		});
//		player.network.sendPacket(packet1);
//	}
//
//	clearUndoHistory() {
//		this.history = [];
//	}
//
//	addUndoHistory(itemId: number, slot: number, action: number) {
//		this.history.push({ itemId, slot, action });
//		this.alternateUndoEnable();
//	}
//
//	remUndoHistory() {
//		if (!this.history.length)
//			return;
//
//		const player = this.owner;
//
//		let element = this.history.pop();
//		if (!element)
//			return;
//
//		let itemId = element.itemId;
//		let actionToUndo = element.action;
//		let slot = element.slot;
//
//		const item = ItemList[itemId as keyof typeof ItemList];
//
//		switch (actionToUndo) {
//			// Undo a sell item
//			case (UndoHistory.ACTION_LIST.SELL): {
//				player.progress.gold -= item.goldCost * 0.7;
//				player.inventory.addItem(slot, itemId);
//				break;
//			}
//			// Undo a buy item
//			case (UndoHistory.ACTION_LIST.BUY): {
//				player.progress.gold += item.goldCost;
//				player.inventory.removeItem(slot);
//				break;
//			}
//			// Undo a builded item
//			case (UndoHistory.ACTION_LIST.BUILD_ITEM): {
//				let buildedItem = player.inventory.items[slot];
//				let goldsToRepay = item.goldCost;
//
//				buildedItem.itemsRemoved.forEach(item => {
//					player.inventory.addItem(item[0], item[1].id);
//					goldsToRepay -= ItemList[item[1].id as keyof typeof ItemList].goldCost;
//				});
//
//				player.progress.gold += goldsToRepay;
//				player.inventory.removeItem(slot);
//				break;
//			}
//		}
//		this.alternateUndoEnable();
//	}
//
//	fixHistoryAfterSwapItems(slot1: number, slot2: number) {
//
//		let tempArr = Array.from(this.history).reverse();
//
//		let itemIndex = tempArr.findIndex(idx => idx.slot === slot1);
//		let item = this.history[this.history.length - (itemIndex + 1)];
//
//		const player = this.owner;
//		if (player.inventory.items[slot1].id === item.itemId)
//			item.slot = slot2;
//	}
//}

/**
 * Trait for units that has inventory (can hold items)
 */
export default class Inventory {
	readonly owner;

	constructor(owner: AttackableUnit) {
		this.owner = owner;
	}

	items: (ItemOnSlot | undefined)[] = [];

	getSlotForRecipeItem(item: Item): number | undefined {
		const recipeItems = item.recipeItems;
		if (!recipeItems)
			return;

		for (let i = 0; i < recipeItems.length; i++) {
			const recipeItem = recipeItems[i]!;

			for (let slot = 0; slot < ItemSlots; slot++) {
				const itemOnSlot = this.items[slot];
				if (!itemOnSlot)
					continue;

				if (itemOnSlot.item !== recipeItem)
					continue;

				return slot;
			}
		}

		for (let i = 0; i < recipeItems.length; i++) {
			const recipeItem = recipeItems[i]!;

			const slot = this.getSlotForRecipeItem(recipeItem);
			if (slot === undefined)
				continue;

			return slot;
		}
	}

	getSlotForAcquiredItem(item: Item) {
		if (item.isTrinket)
			return TrinketSlot;

		const maxStack = item.maxStack || 1;

		if (maxStack > 1) {
			for (let slot = 0; slot < ItemSlots; slot++) {
				const itemOnSlot = this.items[slot];
				if (!itemOnSlot)
					continue;

				if (itemOnSlot.item !== item)
					continue;

				if (itemOnSlot.stacks >= maxStack)
					continue;

				return slot;
			}
		}

		for (let slot = 0; slot < ItemSlots; slot++) {
			const itemOnSlot = this.items[slot];
			if (itemOnSlot)
				continue;

			return slot;
		}

		return this.getSlotForRecipeItem(item);
	}

	buyItemAns(slot: number) {
		const itemOnSlot = this.items[slot]!;
		const item = itemOnSlot.item;

		const packet1 = packets.BuyItemAns.create({
			netId: this.owner.netId,
			item: {
				itemId: item.itemId,
				slot,
				itemsInSlot: itemOnSlot?.stacks || 1,
				spellCharges: 0,
			},
		});
		this.owner.packets.toVision(packet1);
	}

	getEffectiveGoldCost(item: Item, itemsToRemove: Item[] | null) {
		const price = item.price || 0;
		//if (!price)
		//	throw new Error(`Item ${item.name} has no price`);

		let goldCost = price;

		const recipeItems = item.recipeItems || [];
		recipeItems.forEach(item2 => {
			if (itemsToRemove) {
				const ownedItems = this.items.filter(Boolean).map(v => v!.item);
				if (ownedItems.includes(item2)) {
					itemsToRemove.push(item2);
					return;
				}
			}

			const goldCost2 = this.getEffectiveGoldCost(item2, itemsToRemove);
			goldCost += goldCost2;
		});

		return goldCost;
	}

	removeBuildItems(itemsToRemove: Item[]) {
		for (let i = 0; i < this.items.length; i++) {
			const itemOnSlot = this.items[i];
			if (!itemOnSlot)
				continue;

			const item = itemOnSlot.item;
			const itemToRemoveIndex = itemsToRemove.indexOf(item);
			if (itemToRemoveIndex === -1)
				continue;

			this.removeItem(i);
			itemsToRemove.splice(itemToRemoveIndex, 1);
		}
	}

	buyItem(itemId: number) {
		if (!itemId)
			throw new Error('itemId is undefined');

		const item = getItem(itemId);
		if (!item)
			throw new Error(`Item ${itemId} not found`);

		if (!item.itemId)
			throw new Error(`Item ${itemId} has no itemId`);

		const itemsToRemove: Item[] = [];
		const goldCost = this.getEffectiveGoldCost(item, itemsToRemove);

		const owner = this.owner;
		if (owner.progress.gold < goldCost)
			throw new Error(`Not enough gold to buy item ${itemId}`);

		const slot = this.getSlotForAcquiredItem(item);
		if (slot === undefined)
			throw new Error(`No slot available for new item ${itemId}`);

		if (itemsToRemove.length > 0)
			this.removeBuildItems(itemsToRemove);

		owner.progress.gold -= goldCost;
		sendUnitStats(owner);

		this.items[slot] = this.items[slot] || {
			item,
			stacks: 0,
		};

		const itemOnSlot = this.items[slot];
		itemOnSlot.stacks++;

		this.buyItemAns(slot);
		item.eventEmitter.emit('acquire', owner);
	}

	swapItemsAns(source: number, destination: number) {
		const packet1 = packets.SwapItemAns.create({
			netId: this.owner.netId,
			source,
			destination,
		});
		this.owner.packets.toVision(packet1);
	}

	swapItems(source: number, destination: number) {
		if (source < 0 || source >= ItemSlots)
			throw new Error(`Invalid slot ${source}`);
		if (destination < 0 || destination >= ItemSlots)
			throw new Error(`Invalid slot ${destination}`);

		const swap1 = this.items[source];
		if (!swap1) {
			//throw new Error(`Source slot is empty`);
			return;
		}

		this.items[source] = this.items[destination];
		this.items[destination] = swap1;

		this.swapItemsAns(source, destination);
		// TODO: sometimes source slot icon stucks on slot after swapping
	}

	removeItemAns(slot: number) {
		const packet1 = packets.RemoveItemAns.create({
			netId: this.owner.netId,
			slot,
			itemsInSlot: this.items[slot]?.stacks,
		});
		this.owner.packets.toVision(packet1);
	}

	removeItem(slot: number) {
		const itemOnSlot = this.items[slot];
		if (!itemOnSlot)
			throw new Error(`Item not found in slot ${slot}`);

		itemOnSlot.stacks--;
		this.removeItemAns(slot);

		if (itemOnSlot.stacks > 0)
			return;

		this.items[slot] = undefined;
		const item = itemOnSlot.item!;
		item.eventEmitter.emit('throw', this.owner);
	}

	sellItem(slot: number) {
		const itemOnSlot = this.items[slot];
		if (!itemOnSlot)
			throw new Error(`Item not found in slot ${slot}`);

		const item = itemOnSlot.item!;
		if (!item.canBeSold)
			throw new Error(`Item ${item.name} cannot be sold`);

		const goldCost = this.getEffectiveGoldCost(item, null);
		const sellMultiplier = item.sellMultiplier;

		const owner = this.owner;
		owner.progress.gold += goldCost * sellMultiplier;
		sendUnitStats(owner);

		this.removeItem(slot);
	}

	useItem(slot: number, target: AttackableUnit | undefined = undefined) {
		const itemOnSlot = this.items[slot];
		console.log('inventory.useItem', itemOnSlot);
		if (!itemOnSlot)
			throw new Error(`Item not found in slot ${slot}`);

		const item = itemOnSlot.item!;
		item.eventEmitter.emit('use', this.owner, target);

		if (item.consumable)
			this.removeItem(slot);
	}

	castItem(packet: packets.CastSpellReqModel) {
		this.useItem(packet.slot - 6);
	}

}
