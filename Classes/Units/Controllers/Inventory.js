const { createPacket } = require("../../../PacketUtilities");
const ItemList = require("./ItemList");

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
		//this.parent.stats.Gold -= Item.GoldCost;

		var slot = false;
		if(!Item.isTrinket)
			slot = this.getReuseSlot(itemId) || this.getEmptySlot();
		else
			slot = TrinketSlot;

		if(slot === false)
			return false;

		var effectiveGoldCost = Item.GoldCost

		if(Item.from)
		{
			// If an Item can be build from another items
			// set the effective gold Cost to substract
			// Meanwhile remove the "from" items
			// At the end, reassign the item slot
			effectiveGoldCost = this.buildFromItems( Item )
			slot = this.getEmptySlot();
		}

		this.parent.stats.Gold -= effectiveGoldCost;

		this.Items[slot] = this.Items[slot] || new Item();
		this.Items[slot].count = this.Items[slot].count || 0;
		this.Items[slot].count++;

		this.buyItemAns(slot);
		this.parent.stats.charStats_send();
	}
	buildFromItems( item ){

		var goldCost = item.GoldCost;
		item.from.forEach( childItemId =>{
			for( var slot = 0; slot < ItemSlots; slot++ )
			{
				if( this.Items[slot] && this.Items[slot].id == childItemId )
				{
					goldCost -= ItemList[childItemId].GoldCost
					this.removeItem(slot)
				}
			}
		})
		return goldCost
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
		this.parent.stats.Gold += Item.GoldSell;
		
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
