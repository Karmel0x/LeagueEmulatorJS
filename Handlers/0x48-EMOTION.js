
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");


module.exports = function(q, obj1){
    console.log('handle: C2S.EMOTION');
	console.log(obj1);

    
	{
        var EMOTION = createPacket('EMOTION');
        EMOTION.packet.netId = global.Players[0].netId;
        EMOTION.packet.EmoteID = obj1.EmoteID;
        var isSent = sendPacket(EMOTION);
	}

};
