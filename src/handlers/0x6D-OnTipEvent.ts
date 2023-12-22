
/**
 * 
 * @param {import('../gameobjects/units/Player.js')} player 
 * @param {typeof import('../packets/C2S/0x6D-OnTipEvent.js').struct} packet 
 */
export default (player, packet) => {
	console.log('handle: C2S.OnTipEvent');
	//console.log(packet);


};
