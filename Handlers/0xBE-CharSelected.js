
const loadingStages = require("../Constants/loadingStages");

const Game = require('../Game/Initializers/Game');


var spawned = false;


module.exports = (player, packet) => {
	console.log('handle: C2S.CharSelected');
	//console.log(packet);


	var StartSpawn = global.Network.createPacket('StartSpawn');
	player.sendPacket(StartSpawn, loadingStages.NOT_CONNECTED);

	if (!spawned) {//temporary here
		spawned = true;
		Game.loaded();
	}

	player.sendReconnectPackets();

	var EndSpawn = global.Network.createPacket('EndSpawn');
	player.sendPacket(EndSpawn, loadingStages.NOT_CONNECTED);

};
