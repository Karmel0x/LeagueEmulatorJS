const { createPacket } = require("../../Core/PacketUtilities");
const ItemList = require("../../Game/LeagueData/Items/ItemList");
const ItemSpells = require("../../Game/LeagueData/Items/ItemSpells")


var ItemSlots = 6;// 0-5
var TrinketSlot = 6;
//var ExtraItemSlots = 6;// 7-12
//var ExtraTrinketSlot = 13;
//var RuneSlots = 30;// 14-44


class ItemActionList {
	static SELL = 0;
	static BUY  = 1;
	static BUILD_ITEM = 2;
}

class UndoHistory {
	history = [];
	constructor(parent){
		this.parent = parent;
		this.owner = parent.owner || parent.parent || parent;
		
	}
	alternateUndoEnable(){
		var player = this.owner;
		var SetUndoEnabled = createPacket('SetUndoEnabled');
		SetUndoEnabled.netId = player.netId;
		SetUndoEnabled.UndoStackSize = this.history.length;
		var isSent = player.sendPacket(SetUndoEnabled);
	}
	clearUndoHistory(){
		this.history = [];
	}
	addUndoHistory(itemId, slot, action){
		this.history.push({ itemId: itemId, slot: slot, action: action });
		this.alternateUndoEnable();
	}
	remUndoHistory(){
		if(!this.history.length)
			return;

		var player = this.owner;

		var element = this.history.pop();
		var itemId = element.itemId;
		var actionToUndo = element.action;
		var slot = element.slot;

		var Item = ItemList[itemId];

		switch(actionToUndo)
		{
			case(ItemActionList.SELL): // Undo a sell Item
			{
				player.gold -= Item.GoldCost * 0.7;
				player.addItem(slot, itemId);
				break;
			}
			case(ItemActionList.BUY): // Undo a buy Item
			{
				player.gold += Item.GoldCost;
				player.removeItem(slot);
				break;
			}
			case(ItemActionList.BUILD_ITEM): // Undo a builded Item
			{
				var buildedItem = player.Items[slot];
				var goldsToRepay = Item.GoldCost;

				buildedItem.itemsRemoved.forEach(item => {
					player.addItem(item[0], item[1].id);
					goldsToRepay -= ItemList[item[1].id].GoldCost;
				})

				player.gold += goldsToRepay;
				player.removeItem(slot);
				break;
			}
		}
		this.alternateUndoEnable();
	}
	fixHistoryAfterSwapItems(slot1, slot2){

		var tempArr = Array.from(this.history).reverse();

		var itemIndex = tempArr.findIndex(idx => idx.slot == slot1);
		var item = this.history[this.history.length - (itemIndex + 1)];

		var player = this.owner;
		if(player.Items[slot1].id == item.itemId)
			item.slot = slot2;
	}
}


module.exports = (I) => class IInventory extends I {

    constructor(...args){
		super(...args);

		this.UndoHistory = new UndoHistory(this);
    }
	Items = {};
	itemsToRemove = [];

	getReuseSlot(itemId){ // * -> I don't like this but actually work... probably I will take look about this soon

		if(!ItemList[itemId].isStackable)
			return this.getEmptySlot(); // *

		for(var slot = 0; slot < ItemSlots; slot++)
			if(this.Items[slot] && this.Items[slot].id == itemId)
				return slot;

		return this.getEmptySlot(); // *
	}
	getEmptySlot(){
		for(var slot = 0; slot < ItemSlots; slot++)
			if(!this.Items[slot])
				return slot;

		return false;
	}
	buyItemAns(slot){
		var BUY_ITEM_ANS = createPacket('BUY_ITEM_ANS');
		BUY_ITEM_ANS.netId = this.netId;
		BUY_ITEM_ANS.Item = {
			ItemID: this.Items[slot]?.id || 0,
			Slot: slot,
			ItemsInSlot: this.Items[slot]?.count || 0,
			SpellCharges: 0,
		};
		//BUY_ITEM_ANS.bitfield = {
		//	unk0: true,
		//	unk3: true,
		//	unk5: true,
		//};
		this.sendTo_vision(BUY_ITEM_ANS);
	}
	buyItem(itemId){
		if(!itemId || !ItemList[itemId])
			return false;

		var Item = ItemList[itemId];
		var slot = false;
		var effectiveGoldCost = Item.GoldCost;
		this.itemsToRemove = [];

		// If an Item can be build from another items
		// set the effective gold Cost to substract
		// Meanwhile remove the "from" items
		// At the end, reassign the item slot
		if(Item.from)
			effectiveGoldCost = this.getEffectiveGoldCost(Item);

		if(this.gold < effectiveGoldCost)
			return false;

		if(!Item.isTrinket)
			slot = this.getReuseSlot(itemId);
		else
			slot = TrinketSlot;

		if(slot === false)
			return false;

		if(this.itemsToRemove.length)
			this.removeBuildItems();

		this.gold -= effectiveGoldCost;

		this.Items[slot] = this.Items[slot] || new Item();
		this.Items[slot].count = this.Items[slot].count || 0;
		this.Items[slot].count++;

		this.buyItemAns(slot);

		if(ItemList[itemId].stats)
			this.increaseStats(ItemList[itemId].stats);

		this.charStats_send();

		if(this.itemsToRemove.length)
		{
			this.Items[slot].itemsRemoved = this.itemsToRemove;
			this.UndoHistory.addUndoHistory(itemId, slot, 2);
		}
		else
			this.UndoHistory.addUndoHistory(itemId, slot, 1);
	}
	getEffectiveGoldCost(item){

		var goldCost = item.GoldCost;
		
		item.from.forEach( childItemId =>{
			for(var slot = 0; slot < ItemSlots; slot++)
				if(this.Items[slot] && this.Items[slot].id == childItemId)
				{
					goldCost -= ItemList[childItemId].GoldCost;
					this.itemsToRemove.push([slot, this.Items[slot]]);
					break;
				}
		})
		return goldCost;
	}
	removeBuildItems(){
		this.itemsToRemove.forEach(item => this.removeItem(item[0]));
	}
	swapItemsAns(slot1, slot2){
		var SWAP_ITEMS = createPacket('SWAP_ITEMS');
		SWAP_ITEMS.netId = this.netId;
		SWAP_ITEMS.Source = slot1;
		SWAP_ITEMS.Destination = slot2;
		this.sendTo_vision(SWAP_ITEMS);
	}
	swapItems(slot1, slot2){
		if(slot1 < 0 || slot1 >= ItemSlots || slot2 < 0 || slot2 >= ItemSlots)
			return false;

		this.UndoHistory.fixHistoryAfterSwapItems(slot1, slot2);

		var swap1 = this.Items[slot1] || undefined;
		this.Items[slot1] = this.Items[slot2] || undefined;
		this.Items[slot2] = swap1;
		
		this.swapItemsAns(slot1, slot2);
	}
	removeItemAns(slot){
		var REMOVE_ITEM = createPacket('REMOVE_ITEM');
		REMOVE_ITEM.netId = this.netId;
		REMOVE_ITEM.Slot = slot;
		REMOVE_ITEM.ItemsInSlot = this.Items[slot].count;
		//REMOVE_ITEM.NotifyInventoryChange = false;
		this.sendTo_vision(REMOVE_ITEM);
	}
	removeItem(slot){
		this.Items[slot].count--;
		this.removeItemAns(slot);

		if(ItemList[this.Items[slot].id].stats)
			this.decreaseStats(ItemList[this.Items[slot].id].stats);

		this.charStats_send();

		if(!this.Items[slot].count)
			delete this.Items[slot];
	}
	sellItem(slot){
		if(!this.Items[slot])
			return false;

		var Item = ItemList[this.Items[slot].id];
		var itemId = this.Items[slot].id;
		this.gold += Item.GoldSell ?? (Item.GoldCost * 0.7);
		
		this.removeItem(slot);

		this.UndoHistory.addUndoHistory(itemId, slot, 0);
	}
	useItem(slot, target = undefined){
		console.log('inventory.useItem', this.Items[slot]);
		if(!this.Items[slot] || !ItemSpells[this.Items[slot].id])
			return false;

		(new ItemSpells[this.Items[slot].id]).onUse(target || undefined);
		
		if(this.Items[slot].isConsumable)
			this.removeItem(slot);
	}
	castSpell(packet){
		this.useItem(packet.Slot - 6);
	}
	addItem(slot, itemId){
		var Item = ItemList[itemId];

		this.Items[slot] = this.Items[slot] || new Item();
		this.Items[slot].count = this.Items[slot].count || 0;
		this.Items[slot].count++;

		this.buyItemAns(slot);

		if(ItemList[itemId].stats)
			this.increaseStats(ItemList[itemId].stats);

		this.charStats_send();
	}
};
