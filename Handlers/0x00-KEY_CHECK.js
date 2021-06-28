
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");


module.exports = function(q, obj1){
	console.log('handle: HANDSHAKE.KEY_CHECK');
	console.log(obj1);
	
	{
		var KEY_CHECK = createPacket('KEY_CHECK', 'HANDSHAKE');
		KEY_CHECK.partialKey = [ 0x2A, 0x00, 0xFF ];
		KEY_CHECK.ClientID = 0;
		KEY_CHECK.PlayerID = 1;
		var isSent = sendPacket(KEY_CHECK);
	}
	//{
	//	var WORLD_SEND_GAME_NUMBER = createPacket('WORLD_SEND_GAME_NUMBER');
	//	//WORLD_SEND_GAME_NUMBER.netId = ;
	//	WORLD_SEND_GAME_NUMBER.gameId = 1;
	//	WORLD_SEND_GAME_NUMBER.data = 'Coquinounet';
	//	var isSent = sendPacket(WORLD_SEND_GAME_NUMBER);
	//}

};
