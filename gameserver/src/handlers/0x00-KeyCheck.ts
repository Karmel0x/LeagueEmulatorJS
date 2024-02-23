
import * as packets from '@workspace/packets/packages/packets';
import Server from '../app/server';
import loadingStages from '../constants/loading-stages';
import PlayerList from '../app/player-list';


export default (peerNum: number, packet: packets.KeyCheckModel) => {
	console.log('handle: default.KeyCheck');
	console.log(packet);

	//@todo checks
	let player = PlayerList.list.find(
		p => p.summoner.id == packet.playerId
	);

	if (!player)
		return console.log('player not found');

	PlayerList.peers[peerNum] = player.clientId;
	player.network.peerNum = peerNum;
	Server.network.networkApi.setBlowfish(peerNum, '17BLOhi6KZsTtldTsizvHg==');

	{
		const packet1 = packets.KeyCheck.create({
			//partialKey: [0x2A, 0x00, 0xFF],
			clientId: player.clientId,
			playerId: player.summoner.id,
			//versionNumber: packet.versionNumber,
			//checksum: packet.checksum,
			//dummy1: packet.dummy1,
		});
		player.network.sendPacket(packet1, loadingStages.notConnected);
		player.network.loadingStage = loadingStages.loading;
	}

	//{
	//	const packet1 = packets.World_SendGameNumber.create({
	//		//netId: ,
	//		gameId: 1,
	//		summonerName: 'name',
	//	});
	//	player.network.sendPacket(packet1);
	//}

};
