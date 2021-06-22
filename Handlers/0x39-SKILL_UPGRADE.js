
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");


module.exports = function(q){
    console.log('handle: C2S.SKILL_UPGRADE');

	{
		var obj1 = q.packet.readobj(Packets.C2S.SKILL_UPGRADE.packet);
		q.packet.off = 0;

		console.log(obj1);
	}

};
