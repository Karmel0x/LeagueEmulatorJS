
/**
 * 
 * @param {import('../gameobjects/units/Player.js')} player 
 * @param {typeof import('../packets/C2S/0x8D-ClientFinished.js').struct} packet 
 */
export default (player, packet) => {
	console.log('handle: C2S.ClientFinished');
	//console.log(packet);


};
