const { createPacket } = require("../../../PacketUtilities");
const ItemList = require("./ItemList");

/*
    Action List:
    0 - Sell
    1 - Buy
    2 - Build Items
*/

class UndoHistory {
    constructor( parent ){
        this.parent = parent
    }
    alternateUndoEnable(){
        var SetUndoEnabled = createPacket('SetUndoEnabled')
        SetUndoEnabled.netId = player.netId;
        SetUndoEnabled.UndoStackSize = this.parent.undoHistory.length;
        var isSent = player.sendPacket(SetUndoEnabled);
    }
	clearUndoHistory(){
		this.parent.undoHistory = new Array()
	}
	addUndoHistory(itemId, action, items = null){
		this.parent.undoHistory.push( { itemId: itemId, action: action, buildItems: items } );
        this.alternateUndoEnable()
    }
	remUndoHistory(){
		if( !this.parent.undoHistory.length )
			return

		var itemId = this.parent.undoHistory[ this.parent.undoHistory.length - 1 ].itemId
		var Item = ItemList[itemId]

		
	}
}

module.exports = UndoHistory;