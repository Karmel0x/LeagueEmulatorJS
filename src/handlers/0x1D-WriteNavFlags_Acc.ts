
/**
 * 
 * @param {import('../gameobjects/units/Player.js')} player 
 * @param {typeof import('../packets/C2S/0x1D-WriteNavFlags_Acc.js').struct} packet 
 */
export default (player, packet) => {
	console.log('handle: C2S.WriteNavFlags_Acc');
	//console.log(packet);


};
