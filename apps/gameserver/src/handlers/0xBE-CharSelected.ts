
import Player from '../gameobjects/units/player';
import * as packets from '@repo/packets/list';

import loadingStages from '../constants/loading-stages';
import Game from '../game/initializers/game';

let spawned = false;


export default (player: Player, packet: packets.StartSpawnModel) => {
	console.log('handle: c2s.CharSelected');
	//console.log(packet);


	const packet1 = packets.StartSpawn.create({});
	player.network.sendPacket(packet1, loadingStages.notConnected);

	if (!spawned) {//temporary here
		spawned = true;
		Game.loaded();
	}

	player.network.sendReconnectPackets();

	const packet2 = packets.EndSpawn.create({});
	player.network.sendPacket(packet2, loadingStages.notConnected);

};
