
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");


module.exports = (player, packet) => {
    console.log('handle: C2S.SWAP_ITEMS');
	//console.log(packet);

	player.inventory.sellItem(packet.Slot);//, packet.Sell
};
