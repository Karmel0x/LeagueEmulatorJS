
const Game = require('../Game/Initializers/Game');


module.exports = (player, packet) => {
	console.log('handle: LOADING_SCREEN.RequestJoinTeam');
	//console.log(packet);

	Game.connected(player);
};
