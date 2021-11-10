const { createPacket } = require("../../../PacketUtilities");
const ItemList = require("./ItemList");
const ItemSpells = require("./ItemSpells")
const UndoHistory = require('./UndoHistory')

var ItemSlots = 6;// 0-5
var TrinketSlot = 6;
//var ExtraItemSlots = 6;// 7-12
//var ExtraTrinketSlot = 13;
//var RuneSlots = 30;// 14-44

class Inventory {

    constructor(parent){
        this.parent = parent;
		this.UndoHistory = new UndoHistory( this )
    }
	Items = {};
	getReuseSlot(itemId){	// * -> I don't like this but actually work... probably I will take look about this soon

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
		BUY_ITEM_ANS.netId = this.parent.netId;
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
		var isSent = this.parent.sendPacket(BUY_ITEM_ANS);
	}
	buyItem(itemId){
		if(!itemId || !ItemList[itemId])
			return false;

		var Item = ItemList[itemId];
		if(this.parent.stats.Gold < Item.GoldCost)
			return false;
		this.parent.stats.Gold -= Item.GoldCost;

		var slot = false;
		if( !Item.isTrinket )
			slot = this.getReuseSlot(itemId)
		else
			slot = TrinketSlot;

		if(slot === false)
			return false;

		this.Items[slot] = this.Items[slot] || new Item();
		this.Items[slot].count = this.Items[slot].count || 0;
		this.Items[slot].count++;

		this.buyItemAns(slot);

		if( this.Items[slot].stats )
			this.parent.stats.increaseStats( this.Items[slot].stats )

		this.parent.stats.charStats_send();
		this.UndoHistory.addUndoHistory( itemId, slot, 1 );
	}
	swapItemsAns(slot1, slot2){
		var SWAP_ITEMS = createPacket('SWAP_ITEMS');
		SWAP_ITEMS.netId = this.parent.netId;
		SWAP_ITEMS.Source = slot1;
		SWAP_ITEMS.Destination = slot2;
		var isSent = this.parent.sendPacket(SWAP_ITEMS);
	}
	swapItems(slot1, slot2){
		if(slot1 < 0 || slot1 >= ItemSlots || slot2 < 0 || slot2 >= ItemSlots)
			return false;

		var swap1 = this.Items[slot1] || undefined;
		this.Items[slot1] = this.Items[slot2] || undefined;
		this.Items[slot2] = swap1;
		
		this.swapItemsAns(slot1, slot2);
	}
	removeItemAns(slot){
		var REMOVE_ITEM = createPacket('REMOVE_ITEM');
		REMOVE_ITEM.netId = this.parent.netId;
		REMOVE_ITEM.Slot = slot;
		REMOVE_ITEM.ItemsInSlot = this.Items[slot].count;
		//REMOVE_ITEM.NotifyInventoryChange = false;
		var isSent = this.parent.sendPacket(REMOVE_ITEM);
	}
	removeItem(slot){
		this.Items[slot].count--;
		this.removeItemAns(slot);

		if( this.Items[slot].stats )
			this.parent.stats.decreaseStats( this.Items[slot].stats )

		if(!this.Items[slot].count)
			delete this.Items[slot];
	}
	sellItem(slot){
		if(!this.Items[slot])
			return false;

		var itemId = this.Items[slot].id
		var Item = ItemList[ itemId ];
		this.parent.stats.Gold += Item.GoldCost * 0.4;
		
		this.removeItem(slot);

		this.parent.stats.charStats_send();
		this.UndoHistory.addUndoHistory( itemId, slot, 0 );
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

	}
}


module.exports = Inventory;
