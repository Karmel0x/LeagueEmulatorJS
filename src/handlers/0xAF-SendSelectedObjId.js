
/**
 * 
 * @param {import('../gameobjects/units/Player.js')} player 
 * @param {typeof import('../packets/C2S/0xAF-SendSelectedObjId.js').struct} packet 
 */
export default (player, packet) => {
	console.log('handle: C2S.SendSelectedObjId');
	//console.log(packet);


};
