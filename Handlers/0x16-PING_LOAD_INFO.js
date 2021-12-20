
const Packets = require('../Core/Packets');
const {createPacket, sendPacket} = require('../Core/PacketUtilities');
const loadingStages = require("../Constants/loadingStages");
const Game = require('../Game/Initializers/Game');


module.exports = (player, packet) => {
	console.log('handle: C2S.PING_LOAD_INFO');
	//console.log(packet);

	Game.PING_LOAD_INFO(player, packet);
};
