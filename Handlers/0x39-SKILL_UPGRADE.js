
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");


module.exports = (player, packet) => {
    console.log('handle: C2S.SKILL_UPGRADE');
	//console.log(packet);

    
    player.stats.skillUpgrade(packet.Slot, packet.IsEvolve);

};
