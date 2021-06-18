
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");


module.exports = function(q){
    console.log('handle: C2S_ATTENTION_PING');

	{
		var obj1 = q.packet.readobj(Packets.cmd.C2S_ATTENTION_PING.packet);
		q.packet.off = 0;

		console.log(obj1);

        
        var S2C_ATTENTION_PING = createPacket('S2C_ATTENTION_PING');
        S2C_ATTENTION_PING.packet.Position = obj1.Position;
        S2C_ATTENTION_PING.packet.TargetNetID = obj1.TargetNetID;
        S2C_ATTENTION_PING.packet.pingType = obj1.pingType;
        S2C_ATTENTION_PING.packet.unk1 = 0xFB;
        var isSent = sendPacket(S2C_ATTENTION_PING);
	}

};
