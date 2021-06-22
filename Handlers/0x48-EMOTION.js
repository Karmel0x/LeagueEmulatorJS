
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");


module.exports = function(q){
    console.log('handle: C2S.EMOTION');

	{
		var obj1 = q.packet.readobj(Packets.C2S.EMOTION.packet);
		q.packet.off = 0;

        console.log(obj1);

        var EMOTION = createPacket('EMOTION');
        EMOTION.packet.netId = global.Players[0].netId;
        EMOTION.packet.EmoteID = obj1.EmoteID;
        var isSent = sendPacket(EMOTION);
	}

};
