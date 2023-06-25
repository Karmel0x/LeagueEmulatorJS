
const Server = require("../app/Server");
const loadingStages = require("../constants/loadingStages");

/**
 * 
 * @param {number} peerNum 
 * @param {typeof import('../packets/HANDSHAKE/0x00-KEY_CHECK').struct} packet 
 */
module.exports = (peerNum, packet) => {
	console.log('handle: HANDSHAKE.KEY_CHECK');
	console.log(packet);

	//todo:checks
	var player = Server.players.find(
		player => player.info.playerId == packet.playerId
	);

	if (!player)
		return console.log('player not found');

	Server.playerPeers[peerNum] = player.info.clientId;
	player.peerNum = peerNum;

	{
		var KEY_CHECK = Server.network.createPacket('KEY_CHECK', 'HANDSHAKE');
		KEY_CHECK.content = {
			partialKey: [0x2A, 0x00, 0xFF],
			clientId: player.info.clientId,
			playerId: player.info.playerId,
		};
		player.sendPacket(KEY_CHECK, loadingStages.NOT_CONNECTED);
		player.loadingStage = loadingStages.LOADING;
	}
	//{
	//	var World_SendGameNumber = Server.network.createPacket('World_SendGameNumber');
	//	//World_SendGameNumber.netId = ;
	//	World_SendGameNumber.gameId = 1;
	//	World_SendGameNumber.summonerName = 'Coquinounet';
	//	player.sendPacket(World_SendGameNumber);
	//}

};
