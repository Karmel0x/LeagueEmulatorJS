
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");


module.exports = (player, packet) => {
	console.log('handle: C2S.EMOTION');
	//console.log(packet);

	
	{
		var EMOTION = createPacket('EMOTION');
		EMOTION.netId = player.netId;
		EMOTION.EmoteID = packet.EmoteID;
		var isSent = player.sendPacket(EMOTION);
	}

};
