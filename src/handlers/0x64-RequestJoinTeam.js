
import Game from '../game/initializers/Game.js';


/**
 * 
 * @param {import('../gameobjects/units/Player.js')} player 
 * @param {typeof import('../packets/LOADING_SCREEN/0x64-RequestJoinTeam.js').struct} packet 
 */
export default (player, packet) => {
	console.log('handle: LOADING_SCREEN.RequestJoinTeam');
	//console.log(packet);

	Game.connected(player);
};
