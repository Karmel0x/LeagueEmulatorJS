
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");


module.exports = function(q, obj1){
    console.log('handle: C2S.ATTENTION_PING');
	console.log(obj1);


	{
        var ATTENTION_PING = createPacket('ATTENTION_PING');
        ATTENTION_PING.packet.Position = obj1.Position;
        ATTENTION_PING.packet.TargetNetID = obj1.TargetNetID;
        ATTENTION_PING.packet.pingType = obj1.pingType;
        ATTENTION_PING.packet.unk1 = 0xFB;
        var isSent = sendPacket(ATTENTION_PING);
	}

};
