
/**
 * 
 * @param {import('../gameobjects/units/Player.js')} player 
 * @param {typeof import('../packets/C2S/0x92-World_SendGameNumber.js').struct} packet 
 */
export default (player, packet) => {
	console.log('handle: C2S.World_SendGameNumber');
	//console.log(packet);


};
