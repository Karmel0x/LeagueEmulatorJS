
/**
 * 
 * @param {import('../gameobjects/units/Player.js')} player 
 * @param {typeof import('../packets/C2S/0x3A-UseObject.js').struct} packet 
 */
export default (player, packet) => {
	console.log('handle: C2S.UseObject');
	//console.log(packet);


};
