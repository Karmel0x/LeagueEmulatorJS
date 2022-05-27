
const Packets = require('../Core/Packets');
const {createPacket, sendPacket} = require('../Core/PacketUtilities');


module.exports = (player, packet) => {
    console.log('handle: C2S.SWAP_ITEMS');
	//console.log(packet);

	player.swapItems(packet.Source, packet.Destination);
};
