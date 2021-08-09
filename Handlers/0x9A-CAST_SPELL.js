
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");


module.exports = (player, packet) => {
    console.log('handle: C2S.CAST_SPELL');
	//console.log(packet);

	if(packet.Slot >= 0 && packet.Slot <= 5)
		player.castSpell(packet);
	else if(packet.Slot >= 6 && packet.Slot <= 12)
		player.inventory.castSpell(packet);
};
