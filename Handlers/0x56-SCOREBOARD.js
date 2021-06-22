
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");


module.exports = function(q){
    console.log('handle: C2S.SCOREBOARD');

	{
		var obj1 = q.packet.readobj(Packets.C2S.SCOREBOARD.packet);
		q.packet.off = 0;

	}

    //var SCOREBOARD? = createPacket('SCOREBOARD?');
    //var isSent = sendPacket(SCOREBOARD?);
	
    //global.Players[0].loaded = true;
};
