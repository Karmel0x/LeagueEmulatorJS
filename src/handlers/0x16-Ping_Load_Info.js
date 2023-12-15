
import Game from '../game/initializers/Game.js';


/**
 * 
 * @param {import('../gameobjects/units/Player.js')} player 
 * @param {typeof import('../packets/C2S/0x16-Ping_Load_Info.js').struct} packet 
 */
export default (player, packet) => {
	console.log('handle: C2S.Ping_Load_Info');
	//console.log(packet);

	Game.Ping_Load_Info(player, packet);
};
