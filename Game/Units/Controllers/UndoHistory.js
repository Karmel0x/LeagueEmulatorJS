const { createPacket } = require("../../../Core/PacketUtilities");
const ItemList = require("./ItemList");


class ItemActionList {
	static SELL = 0;
	static BUY  = 1;
	static BUILD_ITEM = 2;
}

class UndoHistory {
	history = [];
	constructor(parent){
		this.parent = parent;
	}
	alternateUndoEnable(){
		var player = this.parent.parent;
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

		var player = this.parent.parent;

		var element = this.history.pop();
		var itemId = element.itemId;
		var actionToUndo = element.action;
		var slot = element.slot;

		var Item = ItemList[itemId];

		switch(actionToUndo)
		{
			case(ItemActionList.SELL): // Undo a sell Item
			{
				player.stats.Gold -= Item.GoldCost * 0.7;
				player.inventory.addItem(slot, itemId);
				break;
			}
			case(ItemActionList.BUY): // Undo a buy Item
			{
				player.stats.Gold += Item.GoldCost;
				player.inventory.removeItem(slot);
				break;
			}
			case(ItemActionList.BUILD_ITEM): // Undo a builded Item
			{
				var buildedItem = player.inventory.Items[slot];
				var goldsToRepay = Item.GoldCost;

				buildedItem.itemsRemoved.forEach(item => {
					player.inventory.addItem(item[0], item[1].id);
					goldsToRepay -= ItemList[item[1].id].GoldCost;
				})

				player.stats.Gold += goldsToRepay;
				player.inventory.removeItem(slot);
				break;
			}
		}
		this.alternateUndoEnable();
	}
	fixHistoryAfterSwapItems(slot1, slot2){

		var tempArr = Array.from(this.history).reverse();

		var itemIndex = tempArr.findIndex(idx => idx.slot == slot1);
		var item = this.history[this.history.length - (itemIndex + 1)];

		if(player.inventory.Items[slot1].id == item.itemId)
			item.slot = slot2;
	}
}

module.exports = UndoHistory;
