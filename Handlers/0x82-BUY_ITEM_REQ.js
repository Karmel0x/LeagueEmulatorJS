
const Packets = require('../Core/Packets');
const {createPacket, sendPacket} = require('../Core/PacketUtilities');


module.exports = (player, packet) => {
    console.log('handle: C2S.BUY_ITEM_REQ');
	//console.log(packet);

	player.buyItem(packet.ItemID);
};
