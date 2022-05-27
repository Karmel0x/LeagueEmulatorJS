
const Packets = require('../Core/Packets');
const {createPacket, sendPacket} = require('../Core/PacketUtilities');


module.exports = (player, packet) => {
	console.log('handle: C2S.SKILL_UPGRADE');
	//console.log(packet);

	
	player.skillUpgrade(packet.Slot, packet.bitfield_IsEvolve);

};
