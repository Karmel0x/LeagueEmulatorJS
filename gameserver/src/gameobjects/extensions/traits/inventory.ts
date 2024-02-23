
import * as packets from '@workspace/packets/packages/packets';
import ItemList from '@workspace/gamedata/Items/ItemList';
import ItemSpells from '@workspace/gamedata/Items/ItemSpells';
import Player from '../../units/player';
import { sendUnitStats } from '../../../packet-helpers/OnReplication';


const ItemSlots = 6;// 0-5
const TrinketSlot = 6;
//const ExtraItemSlots = 6;// 7-12
//const ExtraTrinketSlot = 13;
//const RuneSlots = 30;// 14-44


export class UndoHistory {
	static ACTION_LIST = {
		SELL: 0,
		BUY: 1,
		BUILD_ITEM: 2,
	};

	parent: Inventory;
	owner: Player;
	history: { [s: string]: any; }[] = [];

	constructor(parent: Inventory) {
		this.parent = parent;
		this.owner = parent.owner;

	}

	alternateUndoEnable() {
		const player = this.owner;
		const packet1 = packets.SetUndoEnabled.create({
			netId: player.netId,
			undoStackSize: this.history.length,
		});
		player.network.sendPacket(packet1);
	}

	clearUndoHistory() {
		this.history = [];
	}

	addUndoHistory(itemId: number, slot: number, action: number) {
		this.history.push({ itemId, slot, action });
		this.alternateUndoEnable();
	}

	remUndoHistory() {
		if (!this.history.length)
			return;

		const player = this.owner;

		let element = this.history.pop();
		if (!element)
			return;

		let itemId = element.itemId;
		let actionToUndo = element.action;
		let slot = element.slot;

		const item = ItemList[itemId as keyof typeof ItemList];

		switch (actionToUndo) {
			// Undo a sell item
			case (UndoHistory.ACTION_LIST.SELL): {
				player.progress.gold -= item.goldCost * 0.7;
				player.inventory.addItem(slot, itemId);
				break;
			}
			// Undo a buy item
			case (UndoHistory.ACTION_LIST.BUY): {
				player.progress.gold += item.goldCost;
				player.inventory.removeItem(slot);
				break;
			}
			// Undo a builded item
			case (UndoHistory.ACTION_LIST.BUILD_ITEM): {
				let buildedItem = player.inventory.items[slot];
				let goldsToRepay = item.goldCost;

				buildedItem.itemsRemoved.forEach(item => {
					player.inventory.addItem(item[0], item[1].id);
					goldsToRepay -= ItemList[item[1].id as keyof typeof ItemList].goldCost;
				});

				player.progress.gold += goldsToRepay;
				player.inventory.removeItem(slot);
				break;
			}
		}
		this.alternateUndoEnable();
	}

	fixHistoryAfterSwapItems(slot1: number, slot2: number) {

		let tempArr = Array.from(this.history).reverse();

		let itemIndex = tempArr.findIndex(idx => idx.slot == slot1);
		let item = this.history[this.history.length - (itemIndex + 1)];

		const player = this.owner;
		if (player.inventory.items[slot1].id == item.itemId)
			item.slot = slot2;
	}
}


/**
 * Trait for units that has inventory (can hold items)
 */
export default class Inventory {
	owner;
	undoHistory;

	constructor(owner: Player) {
		this.owner = owner;

		this.undoHistory = new UndoHistory(this);
	}

	items: { [n: number]: any; } = {};
	itemsToRemove: any[][] = [];

	/**
	 * @todo
	 */
	getReuseSlot(itemId: number) {
		const item = ItemList[itemId as keyof typeof ItemList];
		if (!item.isStackable)
			return this.getEmptySlot();

		for (let slot = 0; slot < ItemSlots; slot++) {
			let itemOnSlot = this.items[slot];
			if (itemOnSlot && itemOnSlot.id == itemId)
				return slot;
		}

		return this.getEmptySlot();
	}

	getEmptySlot() {
		for (let slot = 0; slot < ItemSlots; slot++)
			if (!this.items[slot])
				return slot;

		return undefined;
	}

	buyItemAns(slot: number) {
		let itemOnSlot = this.items[slot];

		const packet1 = packets.BuyItemAns.create({
			netId: this.owner.netId,
			item: {
				itemId: itemOnSlot?.id || 0,
				slot: slot,
				itemsInSlot: itemOnSlot?.count || 0,
				spellCharges: 0,
			},
			unknown1: false,
			unknown2: false,
		});
		this.owner.packets.toVision(packet1);
	}

	buyItem(itemId: number) {
		if (!itemId)
			return false;

		const item = ItemList[itemId];
		if (!item)
			return false;

		let slot: number | undefined = undefined;
		let effectiveGoldCost = item.goldCost;
		this.itemsToRemove = [];

		// If an item can be build from another items
		// set the effective gold Cost to substract
		// Meanwhile remove the "from" items
		// At the end, reassign the item slot
		if (item.from)
			effectiveGoldCost = this.getEffectiveGoldCost(item);

		if (this.owner.progress.gold < effectiveGoldCost)
			return false;

		if (!item.isTrinket)
			slot = this.getReuseSlot(itemId);
		else
			slot = TrinketSlot;

		if (slot === undefined)
			return false;

		if (this.itemsToRemove.length)
			this.removeBuildItems();

		this.owner.progress.gold -= effectiveGoldCost;


		let itemOnSlot = this.items[slot] = this.items[slot] || new item();
		itemOnSlot.count = itemOnSlot.count || 0;
		itemOnSlot.count++;

		this.buyItemAns(slot);

		if (item.stats)
			this.owner.stats.increase(item.stats);

		sendUnitStats(this.owner);

		if (this.itemsToRemove.length) {
			itemOnSlot.itemsRemoved = this.itemsToRemove;
			this.undoHistory.addUndoHistory(itemId, slot, 2);
		}
		else
			this.undoHistory.addUndoHistory(itemId, slot, 1);
	}

	getEffectiveGoldCost(item: any) {
		let goldCost = item.goldCost;

		item.from.forEach(childItemId => {
			let item = ItemList[childItemId as keyof typeof ItemList];
			for (let slot = 0; slot < ItemSlots; slot++) {
				let itemOnSlot = this.items[slot];
				if (itemOnSlot && itemOnSlot.id == childItemId) {
					goldCost -= item.goldCost;
					this.itemsToRemove.push([slot, itemOnSlot]);
					break;
				}
			}
		});
		return goldCost;
	}

	removeBuildItems() {
		this.itemsToRemove.forEach(item => this.removeItem(item[0]));
	}

	swapItemsAns(slot1: number, slot2: number) {
		const packet1 = packets.SwapItemAns.create({
			netId: this.owner.netId,
			sourceSlot: slot1,
			destinationSlot: slot2,
		});
		this.owner.packets.toVision(packet1);
	}

	swapItems(slot1: number, slot2: number) {
		if (slot1 < 0 || slot1 >= ItemSlots || slot2 < 0 || slot2 >= ItemSlots)
			return false;

		this.undoHistory.fixHistoryAfterSwapItems(slot1, slot2);

		let swap1 = this.items[slot1] || undefined;
		this.items[slot1] = this.items[slot2] || undefined;
		this.items[slot2] = swap1;

		this.swapItemsAns(slot1, slot2);
	}

	removeItemAns(slot: number) {
		const packet1 = packets.RemoveItemAns.create({
			netId: this.owner.netId,
			slot: slot,
			itemsInSlot: this.items[slot].count,
			notifyInventoryChange: false,
		});
		//packet1.NotifyInventoryChange = false;
		this.owner.packets.toVision(packet1);
	}

	removeItem(slot: number) {
		this.items[slot].count--;
		this.removeItemAns(slot);
		let itemOnSlot = this.items[slot];
		const item = ItemList[itemOnSlot.id];

		if (item.stats)
			this.owner.stats.increase(item.stats);

		sendUnitStats(this.owner);

		if (!itemOnSlot.count)
			delete this.items[slot];
	}

	sellItem(slot: number) {
		let itemOnSlot = this.items[slot];
		if (!itemOnSlot)
			return false;

		const item = ItemList[itemOnSlot.id];
		let itemId = itemOnSlot.id;
		this.owner.progress.gold += item.GoldSell ?? (item.goldCost * 0.7);

		this.removeItem(slot);

		this.undoHistory.addUndoHistory(itemId, slot, 0);
	}

	useItem(slot, target = undefined) {
		let itemOnSlot = this.items[slot];
		console.log('inventory.useItem', itemOnSlot);
		let itemSpell = ItemSpells[itemOnSlot.id];
		if (!itemOnSlot || !itemSpell)
			return false;

		let itemSpellOnSlot = new itemSpell();
		itemSpellOnSlot.onUse(target);

		if (itemOnSlot.isConsumable)
			this.removeItem(slot);
	}

	castItem(packet) {
		this.useItem(packet.slot - 6);
	}

	addItem(slot: number, itemId: number) {
		const item = ItemList[itemId];

		let itemOnSlot = this.items[slot] = this.items[slot] || new item();
		itemOnSlot.count = itemOnSlot.count || 0;
		itemOnSlot.count++;

		this.buyItemAns(slot);

		if (item.stats)
			this.owner.stats.increase(item.stats);

		sendUnitStats(this.owner);
	}
}
