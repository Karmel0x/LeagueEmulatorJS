
const {createPacket, sendPacket} = require('../Core/PacketUtilities');
const Game = require('../Game/Initializers/Game');


module.exports = (player, packet) => {
	console.log('handle: C2S.Ping_Load_Info');
	//console.log(packet);

	Game.Ping_Load_Info(player, packet);
};
