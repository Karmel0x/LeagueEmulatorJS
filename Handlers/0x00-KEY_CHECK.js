
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");


module.exports = function(q){
	console.log('handle: HANDSHAKE.KEY_CHECK');
	{
		var obj1 = q.packet.readobj(Packets.HANDSHAKE.KEY_CHECK.packet);
		q.packet.off = 0;
		console.log(obj1);
	}
	{
		var KEY_CHECK = createPacket('KEY_CHECK', 'HANDSHAKE');
		KEY_CHECK.packet.partialKey = [ 0x2A, 0x00, 0xFF ];
		KEY_CHECK.packet.ClientID = 0;
		KEY_CHECK.packet.PlayerID = 1;
		var isSent = sendPacket(KEY_CHECK);
	}
	//{
	//	var WORLD_SEND_GAME_NUMBER = createPacket('WORLD_SEND_GAME_NUMBER');
	//	//WORLD_SEND_GAME_NUMBER.packet.netId = Packets.netId;
	//	WORLD_SEND_GAME_NUMBER.packet.gameId = 1;
	//	WORLD_SEND_GAME_NUMBER.packet.data = 'Coquinounet';
	//	var isSent = sendPacket(WORLD_SEND_GAME_NUMBER);
	//}

};
