
const Game = require('../game/initializers/Game');


module.exports = (player, packet) => {
	console.log('handle: C2S.Ping_Load_Info');
	//console.log(packet);

	Game.Ping_Load_Info(player, packet);
};
