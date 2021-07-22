
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");


module.exports = (player, packet) => {
    console.log('handle: C2S.CAST_SPELL');
	//console.log(packet);

	player.castSpell(packet);
};
