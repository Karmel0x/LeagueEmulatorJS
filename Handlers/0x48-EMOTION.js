
const Packets = require('../Core/Packets');
const {createPacket, sendPacket} = require('../Core/PacketUtilities');


module.exports = (player, packet) => {
	console.log('handle: C2S.EMOTION');
	//console.log(packet);

	
	{
		var EMOTION = createPacket('EMOTION');
		EMOTION.netId = player.netId;
		EMOTION.EmoteID = packet.EmoteID;
		player.packetController.sendTo_vision(EMOTION);
	}

};
