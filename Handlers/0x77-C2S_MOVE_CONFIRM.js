
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");


module.exports = function(q){
    console.log('handle: C2S_MOVE_CONFIRM');

	{
		var obj1 = q.packet.readobj(Packets.cmd.C2S_MOVE_CONFIRM.packet[0]);
		q.packet.off = 0;

	}

};
