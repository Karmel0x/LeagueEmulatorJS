
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
	let player = Server.players.find(
		player => player.summoner.id == packet.playerId
	);

	if (!player)
		return console.log('player not found');

	Server.playerPeers[peerNum] = player.clientId;
	player.network.peerNum = peerNum;

	{
		const KEY_CHECK = Server.network.createPacket('KEY_CHECK', 'HANDSHAKE');
		KEY_CHECK.content = {
			partialKey: [0x2A, 0x00, 0xFF],
			clientId: player.clientId,
			playerId: player.summoner.id,
		};
		player.network.sendPacket(KEY_CHECK, loadingStages.NOT_CONNECTED);
		player.network.loadingStage = loadingStages.LOADING;
	}
	//{
	//	const World_SendGameNumber = Server.network.createPacket('World_SendGameNumber');
	//	//World_SendGameNumber.netId = ;
	//	World_SendGameNumber.gameId = 1;
	//	World_SendGameNumber.summonerName = 'Coquinounet';
	//	player.network.sendPacket(World_SendGameNumber);
	//}

};
