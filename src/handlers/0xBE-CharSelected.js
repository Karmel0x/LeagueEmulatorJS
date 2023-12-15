
import packets from '../packets/index.js';
import loadingStages from '../constants/loadingStages.js';

import Game from '../game/initializers/Game.js';


let spawned = false;


/**
 * 
 * @param {import('../gameobjects/units/Player.js')} player 
 * @param {typeof import('../packets/C2S/0xBE-CharSelected.js').struct} packet 
 */
export default (player, packet) => {
	console.log('handle: C2S.CharSelected');
	//console.log(packet);


	const packet1 = new packets.StartSpawn();
	player.network.sendPacket(packet1, loadingStages.NOT_CONNECTED);

	if (!spawned) {//temporary here
		spawned = true;
		Game.loaded();
	}

	player.network.sendReconnectPackets();

	const packet2 = new packets.EndSpawn();
	player.network.sendPacket(packet2, loadingStages.NOT_CONNECTED);

};
