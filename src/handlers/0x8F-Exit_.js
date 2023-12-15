
/**
 * 
 * @param {import('../gameobjects/units/Player.js')} player 
 * @param {typeof import('../packets/C2S/0x8F-Exit.js').struct} packet 
 */
export default (player, packet) => {
	console.log('handle: C2S.Exit');
	//console.log(packet);


};
