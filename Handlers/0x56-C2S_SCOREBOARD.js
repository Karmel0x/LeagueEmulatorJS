
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");


module.exports = function(q){
    console.log('handle: C2S_SCOREBOARD');

	{
		var obj1 = q.packet.readobj(Packets.cmd.C2S_SCOREBOARD.packet);
		q.packet.off = 0;

	}

    //var S2C_SCOREBOARD? = createPacket('S2C_SCOREBOARD?');
    //var isSent = sendPacket(S2C_SCOREBOARD?);
	
    //global.Players[0].loaded = true;
};
