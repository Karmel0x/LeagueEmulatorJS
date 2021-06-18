
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");


module.exports = function(q){
    console.log('handle: C2S_EMOTION');

	{
		var obj1 = q.packet.readobj(Packets.cmd.C2S_EMOTION.packet);
		q.packet.off = 0;

        console.log(obj1);

        var S2C_EMOTION = createPacket('S2C_EMOTION');
        S2C_EMOTION.packet.netId = 0x40000001;
        S2C_EMOTION.packet.EmoteID = obj1.EmoteID;
        var isSent = sendPacket(S2C_EMOTION);
	}

};
