
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");


module.exports = function(q){
    console.log('handle: C2S.MOVE_CONFIRM');

	{
		var obj1 = q.packet.readobj(Packets.C2S.MOVE_CONFIRM.packet);
		q.packet.off = 0;

	}

};
