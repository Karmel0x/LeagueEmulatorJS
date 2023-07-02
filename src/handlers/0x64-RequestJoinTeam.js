
const Game = require('../game/initializers/Game');


/**
 * 
 * @param {import('../gameobjects/units/Player')} player 
 * @param {*} packet 
 */
module.exports = (player, packet) => {
	console.log('handle: LOADING_SCREEN.RequestJoinTeam');
	//console.log(packet);

	Game.connected(player);
};
