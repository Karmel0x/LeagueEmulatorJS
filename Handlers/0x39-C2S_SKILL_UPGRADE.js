
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");


module.exports = function(q){
    console.log('handle: C2S_SKILL_UPGRADE');

	{
		var obj1 = q.packet.readobj(Packets.cmd.C2S_SKILL_UPGRADE.packet);
		q.packet.off = 0;

		console.log(obj1);
	}

};