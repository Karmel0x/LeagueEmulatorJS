
const Packets = require('../Core/Packets');
const {createPacket, sendPacket} = require('../Core/PacketUtilities');
const loadingStages = require("../Constants/loadingStages");


module.exports = (peer_num, packet) => {
	console.log('handle: HANDSHAKE.KEY_CHECK', packet);
	//console.log(packet);
	
	//todo:checks
	var player = global.Players.find(
		player => player._PlayerInfo.PlayerID == packet.PlayerID
	);
	global.PlayerPeers[peer_num] = player._PlayerInfo.ClientID;
	player.peer_num = peer_num;
	
	{
		var KEY_CHECK = createPacket('KEY_CHECK', 'HANDSHAKE');
		KEY_CHECK.partialKey = [ 0x2A, 0x00, 0xFF ];
		KEY_CHECK.ClientID = player._PlayerInfo.ClientID;
		KEY_CHECK.PlayerID = player._PlayerInfo.PlayerID;
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
