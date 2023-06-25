
const Server = require("../app/Server");
const loadingStages = require("../constants/loadingStages");

const Game = require('../game/initializers/Game');


var spawned = false;


module.exports = (player, packet) => {
	console.log('handle: C2S.CharSelected');
	//console.log(packet);


	var StartSpawn = Server.network.createPacket('StartSpawn');
	player.sendPacket(StartSpawn, loadingStages.NOT_CONNECTED);

	if (!spawned) {//temporary here
		spawned = true;
		Game.loaded();
	}

	player.sendReconnectPackets();

	var EndSpawn = Server.network.createPacket('EndSpawn');
	player.sendPacket(EndSpawn, loadingStages.NOT_CONNECTED);

};
