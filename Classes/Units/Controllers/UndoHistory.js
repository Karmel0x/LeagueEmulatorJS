const { createPacket } = require("../../../PacketUtilities");
const ItemList = require("./ItemList");

/*
    Action List:
    0 - Sell
    1 - Buy
    2 - Build Item
*/

class UndoHistory {
    constructor( ){
        this.history = new Array()
    }
    alternateUndoEnable(){
        var SetUndoEnabled = createPacket('SetUndoEnabled')
        SetUndoEnabled.netId = player.netId;
        SetUndoEnabled.UndoStackSize = this.history.length;
        var isSent = player.sendPacket(SetUndoEnabled);
    }
	clearUndoHistory(){
		this.history = new Array()
	}
	addUndoHistory(itemId, slot, action, items = null){
		this.history.push( { itemId: itemId, slot: slot, action: action, buildItems: items } );
        this.alternateUndoEnable()
    }
	remUndoHistory(){
		if( !this.history.length )
			return;

        var element = this.history[ this.history.length - 1 ];
		var itemId = element.itemId;
        var actionToUndo = element.action;

		var Item = ItemList[itemId];

        switch( actionToUndo )
        {
            case( 0 ): // Undo a sell Item
            {
                debugger
                break;
            }
            case( 1 ): // Undo a buy Item
            {
                player.stats.Gold += ItemList[itemId].GoldCost;
                player.inventory.removeItem( element.slot );
                player.stats.charStats_send();
                this.history.slice( 0, this.history.length - 1)
                this.alternateUndoEnable()
                break;
            }
            case( 2 ): // Undo a builded Item
            {
                debugger
                break;
            }
        }
	}
}

module.exports = UndoHistory;
