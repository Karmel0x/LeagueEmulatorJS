
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");


module.exports = function(q){
    console.log('handle: C2S.AUTO_ATTACK_OPTION');

	{
		var obj1 = q.packet.readobj(Packets.C2S.AUTO_ATTACK_OPTION.packet);
		q.packet.off = 0;

        console.log(obj1);
	}

};
