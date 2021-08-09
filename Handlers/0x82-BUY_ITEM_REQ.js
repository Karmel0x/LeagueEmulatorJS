
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");


module.exports = (player, packet) => {
    console.log('handle: C2S.BUY_ITEM_REQ');
	//console.log(packet);

	player.inventory.buyItem(packet.ItemID);
};
