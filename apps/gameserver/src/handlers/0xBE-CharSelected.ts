
import type * as packets from '@repo/packets/list';
import loadingStages from '../constants/game-state';
import type Player from '../gameobjects/unit-ai/player';


export default (player: Player, packet: packets.StartSpawnModel) => {
	console.log('handle: c2s.CharSelected');
	//console.log(packet);

	player.network.loadingStage = loadingStages.loaded;
	player.network.sendReconnectPackets();
};
