const { createPacket } = require("../../../PacketUtilities");
const ItemList = require("./ItemList");

/*
    Action List:
    0 - Sell
    1 - Buy
    2 - Build Item
*/

class ItemActionList {
    static SELL = 0;
    static BUY  = 1;
    static BUILD_ITEM = 2;
}

class UndoHistory {
    constructor(){
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
            case( ItemActionList.SELL ): // Undo a sell Item
            {
                player.stats.Gold -= ItemList[itemId].GoldCost;
                player.inventory.addItem( element.slot );
                this.history.slice( 0, this.history.length - 1);
                this.alternateUndoEnable();
                break;
            }
            case( ItemActionList.BUY ): // Undo a buy Item
            {
                player.stats.Gold += ItemList[itemId].GoldCost;
                player.inventory.removeItem( element.slot );
                this.history.slice( 0, this.history.length - 1);
                this.alternateUndoEnable();
                break;
            }
            case( ItemActionList.BUILD_ITEM ): // Undo a builded Item
            {
                debugger
                break;
            }
        }
    }
}

module.exports = UndoHistory;
