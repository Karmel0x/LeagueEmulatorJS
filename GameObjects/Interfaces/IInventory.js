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
		SetUndoEnabled.undoStackSize = this.history.length;
		player.sendPacket(SetUndoEnabled);
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

		var item = ItemList[itemId];

		switch(actionToUndo)
		{
			case(ItemActionList.SELL): // Undo a sell item
			{
				player.gold -= item.GoldCost * 0.7;
				player.addItem(slot, itemId);
				break;
			}
			case(ItemActionList.BUY): // Undo a buy item
			{
				player.gold += item.GoldCost;
				player.removeItem(slot);
				break;
			}
			case(ItemActionList.BUILD_ITEM): // Undo a builded item
			{
				var buildedItem = player.items[slot];
				var goldsToRepay = item.GoldCost;

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
		if(player.items[slot1].id == item.itemId)
			item.slot = slot2;
	}
}


module.exports = (I) => class IInventory extends I {

    constructor(...args){
		super(...args);

		this.UndoHistory = new UndoHistory(this);
    }
	items = {};
	itemsToRemove = [];

	getReuseSlot(itemId){ // * -> I don't like this but actually work... probably I will take look about this soon

		if(!ItemList[itemId].isStackable)
			return this.getEmptySlot(); // *

		for(var slot = 0; slot < ItemSlots; slot++)
			if(this.items[slot] && this.items[slot].id == itemId)
				return slot;

		return this.getEmptySlot(); // *
	}
	getEmptySlot(){
		for(var slot = 0; slot < ItemSlots; slot++)
			if(!this.items[slot])
				return slot;

		return false;
	}
	buyItemAns(slot){
		var BuyItemAns = createPacket('BuyItemAns');
		BuyItemAns.netId = this.netId;
		BuyItemAns.item = {
			itemId: this.items[slot]?.id || 0,
			slot: slot,
			itemsInSlot: this.items[slot]?.count || 0,
			spellCharges: 0,
		};
		//BuyItemAns.bitfield = {
		//	unk0: true,
		//	unk3: true,
		//	unk5: true,
		//};
		this.sendTo_vision(BuyItemAns);
	}
	buyItem(itemId){
		if(!itemId || !ItemList[itemId])
			return false;

		var item = ItemList[itemId];
		var slot = false;
		var effectiveGoldCost = item.GoldCost;
		this.itemsToRemove = [];

		// If an item can be build from another items
		// set the effective gold Cost to substract
		// Meanwhile remove the "from" items
		// At the end, reassign the item slot
		if(item.from)
			effectiveGoldCost = this.getEffectiveGoldCost(item);

		if(this.gold < effectiveGoldCost)
			return false;

		if(!item.isTrinket)
			slot = this.getReuseSlot(itemId);
		else
			slot = TrinketSlot;

		if(slot === false)
			return false;

		if(this.itemsToRemove.length)
			this.removeBuildItems();

		this.gold -= effectiveGoldCost;

		this.items[slot] = this.items[slot] || new item();
		this.items[slot].count = this.items[slot].count || 0;
		this.items[slot].count++;

		this.buyItemAns(slot);

		if(ItemList[itemId].stats)
			this.increaseStats(ItemList[itemId].stats);

		this.charStats_send();

		if(this.itemsToRemove.length)
		{
			this.items[slot].itemsRemoved = this.itemsToRemove;
			this.UndoHistory.addUndoHistory(itemId, slot, 2);
		}
		else
			this.UndoHistory.addUndoHistory(itemId, slot, 1);
	}
	getEffectiveGoldCost(item){

		var goldCost = item.GoldCost;
		
		item.from.forEach( childItemId =>{
			for(var slot = 0; slot < ItemSlots; slot++)
				if(this.items[slot] && this.items[slot].id == childItemId)
				{
					goldCost -= ItemList[childItemId].GoldCost;
					this.itemsToRemove.push([slot, this.items[slot]]);
					break;
				}
		})
		return goldCost;
	}
	removeBuildItems(){
		this.itemsToRemove.forEach(item => this.removeItem(item[0]));
	}
	swapItemsAns(slot1, slot2){
		var SwapItemAns = createPacket('SwapItemAns');
		SwapItemAns.netId = this.netId;
		SwapItemAns.sourceSlot = slot1;
		SwapItemAns.destinationSlot = slot2;
		this.sendTo_vision(SwapItemAns);
	}
	swapItems(slot1, slot2){
		if(slot1 < 0 || slot1 >= ItemSlots || slot2 < 0 || slot2 >= ItemSlots)
			return false;

		this.UndoHistory.fixHistoryAfterSwapItems(slot1, slot2);

		var swap1 = this.items[slot1] || undefined;
		this.items[slot1] = this.items[slot2] || undefined;
		this.items[slot2] = swap1;
		
		this.swapItemsAns(slot1, slot2);
	}
	removeItemAns(slot){
		var RemoveItemAns = createPacket('RemoveItemAns');
		RemoveItemAns.netId = this.netId;
		RemoveItemAns.slot = slot;
		RemoveItemAns.itemsInSlot = this.items[slot].count;
		//RemoveItemAns.NotifyInventoryChange = false;
		this.sendTo_vision(RemoveItemAns);
	}
	removeItem(slot){
		this.items[slot].count--;
		this.removeItemAns(slot);

		if(ItemList[this.items[slot].id].stats)
			this.decreaseStats(ItemList[this.items[slot].id].stats);

		this.charStats_send();

		if(!this.items[slot].count)
			delete this.items[slot];
	}
	sellItem(slot){
		if(!this.items[slot])
			return false;

		var item = ItemList[this.items[slot].id];
		var itemId = this.items[slot].id;
		this.gold += item.GoldSell ?? (item.GoldCost * 0.7);
		
		this.removeItem(slot);

		this.UndoHistory.addUndoHistory(itemId, slot, 0);
	}
	useItem(slot, target = undefined){
		console.log('inventory.useItem', this.items[slot]);
		if(!this.items[slot] || !ItemSpells[this.items[slot].id])
			return false;

		(new ItemSpells[this.items[slot].id]).onUse(target || undefined);
		
		if(this.items[slot].isConsumable)
			this.removeItem(slot);
	}
	castSpell(packet){
		this.useItem(packet.slot - 6);
	}
	addItem(slot, itemId){
		var item = ItemList[itemId];

		this.items[slot] = this.items[slot] || new item();
		this.items[slot].count = this.items[slot].count || 0;
		this.items[slot].count++;

		this.buyItemAns(slot);

		if(ItemList[itemId].stats)
			this.increaseStats(ItemList[itemId].stats);

		this.charStats_send();
	}
};
