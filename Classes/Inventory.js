const { createPacket } = require("../PacketUtilities");

var ItemList = {
	1: class Item {
		static GoldCost = 100;
		use(target = undefined){
			
		}
	},
	3340: class Item { // yellow trinket
		id = 3340;
		static GoldCost = 0;
		static isTrinket = true;
		use(target = undefined){
			
		}
	},
	1055: class Item { // doran's blade
		id = 1055;
		static GoldCost = 440;
	},
	2003: class Item { // health potion
		id = 2003;
		static GoldCost = 35;
		isConsumable = true;
		static isStackable = true;
		use(target = undefined){

		}
	}
};
var ItemSlots = 6;// 0-5
var TrinketSlot = 6;
//var ExtraItemSlots = 6;// 7-12
//var ExtraTrinketSlot = 13;
//var RuneSlots = 30;// 14-44

class Inventory {

    constructor(parent){
        this.parent = parent;

    }
	Items = {};
	getReuseSlot(itemId){
		if(!ItemList[itemId].isStackable)
			return false;

		for(var slot = 0; slot < ItemSlots; slot++)
			if(this.Items[slot] && this.Items[slot].id == itemId)
				return slot;

		return false;
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
		if(!Item.isTrinket)
			slot = this.getReuseSlot(itemId) || this.getEmptySlot(itemId);
		else
			slot = TrinketSlot;

		if(slot === false)
			return false;

		this.Items[slot] = this.Items[slot] || new Item();
		this.Items[slot].count = this.Items[slot].count || 0;
		this.Items[slot].count++;
		this.buyItemAns(slot);
		this.parent.stats.charStats_send();
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

		if(!this.Items[slot].count)
			delete this.Items[slot];
	}
	sellItem(slot){
		if(!this.Items[slot])
			return false;

		var Item = ItemList[this.Items[slot].id];
		this.parent.stats.Gold += Item.GoldCost * 0.4;
		this.removeItem(slot);
		this.parent.stats.charStats_send();
	}
	useItem(slot, target = undefined){
		console.log('inventory.useItem', this.Items[slot]);
		if(!this.Items[slot] || !this.Items[slot].use)
			return false;

		this.Items[slot].use(target || undefined);
		if(this.Items[slot].isConsumable)
			this.removeItem(slot);
	}
	castSpell(packet){
		this.useItem(packet.Slot - 6);
	}
}


module.exports = Inventory;