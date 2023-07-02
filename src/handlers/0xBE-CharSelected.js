
const Server = require("../app/Server");
const loadingStages = require("../constants/loadingStages");

const Game = require('../game/initializers/Game');


let spawned = false;


/**
 * 
 * @param {import('../gameobjects/units/Player')} player 
 * @param {*} packet 
 */
module.exports = (player, packet) => {
	console.log('handle: C2S.CharSelected');
	//console.log(packet);


	const StartSpawn = Server.network.createPacket('StartSpawn');
	player.network.sendPacket(StartSpawn, loadingStages.NOT_CONNECTED);

	if (!spawned) {//temporary here
		spawned = true;
		Game.loaded();
	}

	player.network.sendReconnectPackets();

	const EndSpawn = Server.network.createPacket('EndSpawn');
	player.network.sendPacket(EndSpawn, loadingStages.NOT_CONNECTED);

};
