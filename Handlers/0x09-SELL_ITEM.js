
const Packets = require('../Core/Packets');
const {createPacket, sendPacket} = require('../Core/PacketUtilities');


module.exports = (player, packet) => {
    console.log('handle: C2S.SELL_ITEM');
	//console.log(packet);

	player.sellItem(packet.Slot);//, packet.Sell
};
