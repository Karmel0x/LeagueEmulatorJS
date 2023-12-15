
import packets from '../packets/index.js';
import Server from '../app/Server.js';
import loadingStages from '../constants/loadingStages.js';

/**
 * 
 * @param {number} peerNum 
 * @param {typeof import('../packets/HANDSHAKE/0x00-KEY_CHECK.js').struct} packet 
 */
export default (peerNum, packet) => {
	console.log('handle: HANDSHAKE.KEY_CHECK');
	console.log(packet);

	//todo:checks
	let player = Server.players.find(
		p => p.summoner.id == packet.playerId
	);

	if (!player)
		return console.log('player not found');

	Server.playerPeers[peerNum] = player.clientId;
	player.network.peerNum = peerNum;

	{
		const packet1 = new packets.KEY_CHECK();
		packet1.content = {
			partialKey: [0x2A, 0x00, 0xFF],
			clientId: player.clientId,
			playerId: player.summoner.id,
		};
		player.network.sendPacket(packet1, loadingStages.NOT_CONNECTED);
		player.network.loadingStage = loadingStages.LOADING;
	}
	//{
	//	const packet1 = new packets.World_SendGameNumber();
	//	//packet1.netId = ;
	//	packet1.gameId = 1;
	//	packet1.summonerName = 'Coquinounet';
	//	player.network.sendPacket(packet1);
	//}

};
