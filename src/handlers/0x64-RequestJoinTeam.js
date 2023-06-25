
const Game = require('../game/initializers/Game');


module.exports = (player, packet) => {
	console.log('handle: LOADING_SCREEN.RequestJoinTeam');
	//console.log(packet);

	Game.connected(player);
};
