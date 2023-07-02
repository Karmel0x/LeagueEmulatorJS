
const Game = require('../game/initializers/Game');


/**
 * 
 * @param {import('../gameobjects/units/Player')} player 
 * @param {*} packet 
 */
module.exports = (player, packet) => {
	console.log('handle: C2S.Ping_Load_Info');
	//console.log(packet);

	Game.Ping_Load_Info(player, packet);
};
