
const Packets = require('../Core/Packets');
const {createPacket, sendPacket} = require('../Core/PacketUtilities');
const loadingStages = require("../Constants/loadingStages");
const Game = require('../Game/Initializers/Game');


module.exports = (player, packet) => {
	console.log('handle: LOADING_SCREEN.CLIENT_READY');
	//console.log(packet);

	Game.connected(player);
};
