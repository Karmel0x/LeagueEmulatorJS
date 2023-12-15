
import packets from '../../../packets/index.js';
import ItemList from '../../../game/leaguedata/Items/ItemList.js';
import ItemSpells from '../../../game/leaguedata/Items/ItemSpells.js';


const ItemSlots = 6;// 0-5
const TrinketSlot = 6;
//const ExtraItemSlots = 6;// 7-12
//const ExtraTrinketSlot = 13;
//const RuneSlots = 30;// 14-44


class UndoHistory {
	static ACTION_LIST = {
		SELL: 0,
		BUY: 1,
		BUILD_ITEM: 2,
	};

	/** @type {import("../../units/Player.js").default} */
	owner;
	/** @type {Object.<string, *>[]} */
	history = [];

	/**
	 * 
	 * @param {Inventory} parent 
	 */
	constructor(parent) {
		this.parent = parent;
		this.owner = parent.owner || parent.parent || parent;

	}

	alternateUndoEnable() {
		const player = this.owner;
		const packet1 = new packets.SetUndoEnabled();
		packet1.netId = player.netId;
		packet1.undoStackSize = this.history.length;
		player.network.sendPacket(packet1);
	}

	clearUndoHistory() {
		this.history = [];
	}

	/**
	 * 
	 * @param {number} itemId 
	 * @param {number} slot 
	 * @param {number} action 
	 */
	addUndoHistory(itemId, slot, action) {
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

		const item = ItemList[itemId];

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
					goldsToRepay -= ItemList[item[1].id].goldCost;
				});

				player.progress.gold += goldsToRepay;
				player.inventory.removeItem(slot);
				break;
			}
		}
		this.alternateUndoEnable();
	}

	/**
	 * 
	 * @param {number} slot1 
	 * @param {number} slot2 
	 */
	fixHistoryAfterSwapItems(slot1, slot2) {

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
class Inventory {
	owner;

	/**
	 * @param {import("../../units/Player.js").default} owner
	 */
	constructor(owner) {
		this.owner = owner;

		this.UndoHistory = new UndoHistory(this);
	}

	/** @type {Object.<number, *>} */
	items = {};
	/** @type {*[][]} */
	itemsToRemove = [];

	/**
	 * 
	 * @param {number} itemId 
	 */
	getReuseSlot(itemId) { // * -> I don't like this but actually work... probably I will take look about this soon
		const item = ItemList[itemId];
		if (!item.isStackable)
			return this.getEmptySlot(); // *

		for (let slot = 0; slot < ItemSlots; slot++) {
			let itemOnSlot = this.items[slot];
			if (itemOnSlot && itemOnSlot.id == itemId)
				return slot;
		}

		return this.getEmptySlot(); // *
	}

	getEmptySlot() {
		for (let slot = 0; slot < ItemSlots; slot++)
			if (!this.items[slot])
				return slot;

		return undefined;
	}

	/**
	 * 
	 * @param {number} slot 
	 */
	buyItemAns(slot) {
		let itemOnSlot = this.items[slot];

		const packet1 = new packets.BuyItemAns();
		packet1.netId = this.owner.netId;
		packet1.item = {
			itemId: itemOnSlot?.id || 0,
			slot: slot,
			itemsInSlot: itemOnSlot?.count || 0,
			spellCharges: 0,
		};
		//packet1.bitfield = {
		//	unk0: true,
		//	unk3: true,
		//	unk5: true,
		//};
		this.owner.packets.toVision(packet1);
	}

	/**
	 * 
	 * @param {number} itemId 
	 */
	buyItem(itemId) {
		if (!itemId)
			return false;

		const item = ItemList[itemId];
		if (!item)
			return false;

		/** @type {number | undefined} */
		let slot = undefined;
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

		this.owner.packets.charStats_send();

		if (this.itemsToRemove.length) {
			itemOnSlot.itemsRemoved = this.itemsToRemove;
			this.UndoHistory.addUndoHistory(itemId, slot, 2);
		}
		else
			this.UndoHistory.addUndoHistory(itemId, slot, 1);
	}

	getEffectiveGoldCost(item) {
		let goldCost = item.goldCost;

		item.from.forEach(childItemId => {
			let item = ItemList[childItemId];
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

	/**
	 * 
	 * @param {number} slot1 
	 * @param {number} slot2 
	 */
	swapItemsAns(slot1, slot2) {
		const packet1 = new packets.SwapItemAns();
		packet1.netId = this.owner.netId;
		packet1.sourceSlot = slot1;
		packet1.destinationSlot = slot2;
		this.owner.packets.toVision(packet1);
	}

	/**
	 * 
	 * @param {number} slot1 
	 * @param {number} slot2 
	 */
	swapItems(slot1, slot2) {
		if (slot1 < 0 || slot1 >= ItemSlots || slot2 < 0 || slot2 >= ItemSlots)
			return false;

		this.UndoHistory.fixHistoryAfterSwapItems(slot1, slot2);

		let swap1 = this.items[slot1] || undefined;
		this.items[slot1] = this.items[slot2] || undefined;
		this.items[slot2] = swap1;

		this.swapItemsAns(slot1, slot2);
	}

	/**
	 * 
	 * @param {number} slot 
	 */
	removeItemAns(slot) {
		const packet1 = new packets.RemoveItemAns();
		packet1.netId = this.owner.netId;
		packet1.slot = slot;
		packet1.itemsInSlot = this.items[slot].count;
		//packet1.NotifyInventoryChange = false;
		this.owner.packets.toVision(packet1);
	}

	/**
	 * 
	 * @param {number} slot 
	 */
	removeItem(slot) {
		this.items[slot].count--;
		this.removeItemAns(slot);
		let itemOnSlot = this.items[slot];
		const item = ItemList[itemOnSlot.id];

		if (item.stats)
			this.owner.stats.increase(item.stats);

		this.owner.packets.charStats_send();

		if (!itemOnSlot.count)
			delete this.items[slot];
	}

	/**
	 * 
	 * @param {number} slot 
	 */
	sellItem(slot) {
		let itemOnSlot = this.items[slot];
		if (!itemOnSlot)
			return false;

		const item = ItemList[itemOnSlot.id];
		let itemId = itemOnSlot.id;
		this.owner.progress.gold += item.GoldSell ?? (item.goldCost * 0.7);

		this.removeItem(slot);

		this.UndoHistory.addUndoHistory(itemId, slot, 0);
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

	/**
	 * 
	 * @param {number} slot 
	 * @param {number} itemId 
	 */
	addItem(slot, itemId) {
		const item = ItemList[itemId];

		let itemOnSlot = this.items[slot] = this.items[slot] || new item();
		itemOnSlot.count = itemOnSlot.count || 0;
		itemOnSlot.count++;

		this.buyItemAns(slot);

		if (item.stats)
			this.owner.stats.increase(item.stats);

		this.owner.packets.charStats_send();
	}
}

export default Inventory;
