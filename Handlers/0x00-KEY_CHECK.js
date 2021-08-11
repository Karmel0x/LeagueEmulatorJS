
const Packets = require("../Packets");
const {createPacket, sendPacket} = require("../PacketUtilities");
const loadingStages = require("../Constants/loadingStages");


module.exports = (peer_num, packet) => {
	console.log('handle: HANDSHAKE.KEY_CHECK');
	//console.log(packet);
	
	//todo:checks
	var clientId = global.PlayerPeers[peer_num] = packet.ClientID;
	player = global.Units['ALL'].Player[clientId];
	player.peer_num = peer_num;
	
	{
		var KEY_CHECK = createPacket('KEY_CHECK', 'HANDSHAKE');
		KEY_CHECK.partialKey = [ 0x2A, 0x00, 0xFF ];
		KEY_CHECK.ClientID = clientId;
		KEY_CHECK.PlayerID = 1;
		var isSent = player.sendPacket(KEY_CHECK, loadingStages.NOT_CONNECTED);
	}
	//{
	//	var WORLD_SEND_GAME_NUMBER = createPacket('WORLD_SEND_GAME_NUMBER');
	//	//WORLD_SEND_GAME_NUMBER.netId = ;
	//	WORLD_SEND_GAME_NUMBER.gameId = 1;
	//	WORLD_SEND_GAME_NUMBER.data = 'Coquinounet';
	//	var isSent = player.sendPacket(WORLD_SEND_GAME_NUMBER);
	//}

};
