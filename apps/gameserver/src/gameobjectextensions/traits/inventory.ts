
import * as packets from '@repo/packets/list';
import type Item from '@repo/scripting/base/item';
import type { ItemOnSlot } from '@repo/scripting/base/item';
import { getItem } from '@repo/scripting/load/item';
import GameObjectList from '../../app/game-object-list';
import Server from '../../app/server';
import { type SlotId, SpellConstants } from '../../constants/slot-id';
import type { Hero, Player } from '../../gameobjects/unit-ai';
import { AiSubType, AiType } from '../../gameobjects/unit-ai/types';
import type AttackableUnit from '../../gameobjects/units/attackable-unit';
import { getSlotData } from '../combat/spellable';


//const ItemSlots = 6;// 0-5
const TrinketSlot = 6;
//const ExtraItemSlots = 6;// 7-12
//const ExtraTrinketSlot = 13;
//const RuneSlots = 30;// 14-44

const ItemSlots = SpellConstants.numInventorySlots;
const BluePillSlot = SpellConstants.bluePillSlot;
const TempItemSlot = SpellConstants.temporaryItemSlotStart;
const RuneSlot = SpellConstants.avatarItemSlotStart;

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

		owner.eventEmitter.on('spawn', () => {
			const ai = owner.ai as Hero;
			if (ai.type !== AiType.Hero)
				return;

			const itemId = 2001;// Blue Pill (Recall)
			const item = getItem(`${itemId}`);
			if (item) {
				this.putItemOnSlot(BluePillSlot, item);
			}

			const ai2 = owner.ai as Player;
			if (ai2.subType !== AiSubType.Player)
				return;

			const runes = ai2.options.runes;
			//if (runes.length > 30) {
			//	console.error('incorrect runes quantity');
			//	return;
			//}

			runes.forEach((itemId, i) => {
				const item = getItem(`${itemId}`);
				if (item) {
					this.putItemOnSlot(RuneSlot + i, item);
				}
			});

		});
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

	buyItemAns(slot: number, useOnBought = false) {
		const itemOnSlot = this.items[slot]!;
		const item = itemOnSlot.item;
		const owner = this.owner;

		const packet1 = packets.BuyItemAns.create({
			netId: owner.netId,
			item: {
				itemId: item.itemId,
				slot,
				itemsInSlot: itemOnSlot.stacks || 1,
				spellCharges: 0,
			},
			useOnBought,
		});
		owner.packets.toVision(packet1);
	}

	getEffectiveGoldCost(item: Item, itemsToRemove: Item[] | null) {
		const price = item.price || 0;
		if (!price)
			throw new Error(`item ${item.name} has no price`);

		let goldCost = price;

		const recipeItems = item.recipeItems;
		if (recipeItems) {
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
		}

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

	putItemOnSlot(slot: number, item: Item, stacks = 1) {
		let itemOnSlot = this.items[slot];
		if (itemOnSlot) {
			itemOnSlot.stacks += stacks;
		}
		else {
			itemOnSlot = {
				item,
				stacks,
			};
			this.items[slot] = itemOnSlot;

			const owner = this.owner;
			item.eventEmitter.emit('acquire', owner, itemOnSlot);
		}
	}

	buyItem(itemId: number) {
		(this.owner.ai as Player).packets?.chatBoxDebugMessage('inventory.buyItem', itemId);
		if (!itemId)
			throw new Error('itemId is undefined');

		if (Server.map.items.unpurchasableList.includes(itemId))
			throw new Error('item is unpurchasable on this map');

		const item = getItem(`${itemId}`);
		if (!item)
			throw new Error(`item ${itemId} not found`);

		if (!item.inStore)
			throw new Error(`item ${itemId} not in store`);

		if (!item.itemId)
			throw new Error(`item ${itemId} has no itemId`);

		const itemsToRemove: Item[] = [];
		const goldCost = this.getEffectiveGoldCost(item, itemsToRemove);

		const owner = this.owner;
		if (owner.progress.gold < goldCost)
			throw new Error(`not enough gold to buy item ${itemId}`);

		let useOnBought = false;
		let slot = this.getSlotForAcquiredItem(item);
		if (slot === undefined) {
			if (!item.usableInStore)
				throw new Error(`no slot available for new item ${itemId}`);

			useOnBought = true;
			slot = TempItemSlot;
		}

		if (itemsToRemove.length > 0)
			this.removeBuildItems(itemsToRemove);

		owner.progress.gold -= goldCost;
		owner.markReplicateStats();

		this.putItemOnSlot(slot, item);
		this.buyItemAns(slot, useOnBought);
	}

	swapItemsAns(source: number, destination: number) {
		const owner = this.owner;
		const packet1 = packets.SwapItemAns.create({
			netId: owner.netId,
			source,
			destination,
		});
		owner.packets.toVision(packet1);
	}

	swapItems(source: number, destination: number) {
		if (source < 0 || source >= ItemSlots)
			throw new Error(`invalid slot ${source}`);
		if (destination < 0 || destination >= ItemSlots)
			throw new Error(`invalid slot ${destination}`);

		const swap1 = this.items[source];
		if (!swap1) {
			//throw new Error(`source slot is empty`);
			return;
		}

		this.items[source] = this.items[destination];
		this.items[destination] = swap1;

		this.swapItemsAns(source, destination);
		// TODO: sometimes source slot icon stucks on slot after swapping
	}

	removeItemAns(slot: number) {
		const owner = this.owner;
		const packet1 = packets.RemoveItemAns.create({
			netId: owner.netId,
			slot,
			itemsInSlot: this.items[slot]?.stacks,
		});
		owner.packets.toVision(packet1);
	}

	removeItem(slot: number) {
		const itemOnSlot = this.items[slot];
		if (!itemOnSlot)
			throw new Error(`item not found in slot ${slot}`);

		itemOnSlot.stacks--;
		this.removeItemAns(slot);

		if (itemOnSlot.stacks > 0)
			return;

		this.items[slot] = undefined;
		const item = itemOnSlot.item!;
		item.eventEmitter.emit('throw', this.owner, itemOnSlot);
	}

	sellItem(slot: number) {
		const itemOnSlot = this.items[slot];
		if (!itemOnSlot)
			throw new Error(`item not found in slot ${slot}`);

		const item = itemOnSlot.item!;
		const sellMultiplier = item.sellMultiplier;
		if (sellMultiplier === undefined)
			throw new Error(`item ${item.name} cannot be sold`);

		const goldCost = this.getEffectiveGoldCost(item, null);

		const owner = this.owner;
		owner.progress.gold += goldCost * sellMultiplier;
		owner.markReplicateStats();

		this.removeItem(slot);
	}

	useItemAns(slot: number, itemOnSlot: ItemOnSlot) {
		//const itemOnSlot = this.items[slot]!;
		//const item = itemOnSlot.item;
		const owner = this.owner;

		const packet1 = packets.UseItemAns.create({
			netId: owner.netId,
			slot: slot,
			itemsInSlot: itemOnSlot.stacks,
			spellCharges: 0,
		});
		owner.packets.toVision(packet1);
	}

	useItem(slot: number, packet: Partial<packets.CastSpellReqModel>, target: AttackableUnit | undefined = undefined) {
		const itemOnSlot = this.items[slot];
		console.log('inventory.useItem', slot, itemOnSlot?.item?.name);
		if (!itemOnSlot)
			throw new Error(`item not found in slot ${slot}`);

		const item = itemOnSlot.item!;
		if (!item.useEffect)
			throw new Error(`item is not usable ${item}`);

		item.eventEmitter.emit('use', this.owner, packet, target);

		if (item.consumed) {
			this.removeItem(slot);
			this.useItemAns(slot, itemOnSlot);
		}
	}

	castItem(packet: packets.CastSpellReqModel) {
		let target = GameObjectList.objectByNetId[packet.targetNetId] as AttackableUnit | undefined;
		if (!target || !target.ai)
			target = undefined;

		const owner = this.owner;
		const slot = packet.slot as SlotId;
		const slotData = getSlotData(owner, slot);

		if (slotData.sealed)
			throw new Error('slot is sealed');

		const itemSlot = slot - SpellConstants.spellsItemsSlot;
		this.useItem(itemSlot, packet, target);
	}

}
