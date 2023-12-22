
/**
 * 
 * @param {import('../gameobjects/units/Player.js')} player 
 * @param {typeof import('../packets/GAMEPLAY/0x08-SynchSimTime.js').struct} packet 
 */
export default (player, packet) => {
	console.log('handle: GAMEPLAY.SynchSimTime');
	//console.log(packet);


};
