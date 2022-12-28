
const loadingStages = require("../Constants/loadingStages");


module.exports = (peer_num, packet) => {
	console.log('handle: HANDSHAKE.KEY_CHECK');
	console.log(packet);

	//todo:checks
	var player = global.Players.find(
		player => player.info.playerId == packet.playerId
	);
	global.PlayerPeers[peer_num] = player.info.clientId;
	player.peer_num = peer_num;

	{
		var KEY_CHECK = global.Network.createPacket('KEY_CHECK', 'HANDSHAKE');
		KEY_CHECK.content = {
			partialKey: [0x2A, 0x00, 0xFF],
			clientId: player.info.clientId,
			playerId: player.info.playerId,
		};
		player.sendPacket(KEY_CHECK, loadingStages.NOT_CONNECTED);
		player.loadingStage = loadingStages.LOADING;
	}
	//{
	//	var World_SendGameNumber = global.Network.createPacket('World_SendGameNumber');
	//	//World_SendGameNumber.netId = ;
	//	World_SendGameNumber.gameId = 1;
	//	World_SendGameNumber.summonerName = 'Coquinounet';
	//	player.sendPacket(World_SendGameNumber);
	//}

};
