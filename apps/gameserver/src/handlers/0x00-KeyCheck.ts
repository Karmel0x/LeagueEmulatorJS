
import * as packets from '@repo/packets/list';
import Server from '../app/server';
import UnitAiList from '../app/unit-ai-list';
import loadingStages from '../constants/game-state';
import type { Player } from '../gameobjects/unit-ai';


export default (peerNum: number, packet: packets.KeyCheckModel) => {
	console.log('handle: default.KeyCheck');
	console.log(packet);

	//@todo checks
	const players = Server.players.map(player => player.ai as Player);
	const player = players.find(
		p => p.summoner.id === packet.playerId
	);

	if (!player)
		return console.warn('player not found');

	UnitAiList.playerByPeer[peerNum] = player;
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
