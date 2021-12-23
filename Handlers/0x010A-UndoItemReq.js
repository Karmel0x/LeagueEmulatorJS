
const Packets = require('../Core/Packets');
const {createPacket, sendPacket} = require('../Core/PacketUtilities');


module.exports = (player, packet) => {
    console.log('handle: C2S.UndoItemReq');
	//console.log(packet);
	
	player.inventory.UndoHistory.remUndoHistory()
};
