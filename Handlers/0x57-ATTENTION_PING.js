
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");


module.exports = function(q){
    console.log('handle: C2S.ATTENTION_PING');

	{
		var obj1 = q.packet.readobj(Packets.C2S.ATTENTION_PING.packet);
		q.packet.off = 0;

		console.log(obj1);

        
        var ATTENTION_PING = createPacket('ATTENTION_PING');
        ATTENTION_PING.packet.Position = obj1.Position;
        ATTENTION_PING.packet.TargetNetID = obj1.TargetNetID;
        ATTENTION_PING.packet.pingType = obj1.pingType;
        ATTENTION_PING.packet.unk1 = 0xFB;
        var isSent = sendPacket(ATTENTION_PING);
	}

};
