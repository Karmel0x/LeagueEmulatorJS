
/**
 * 
 * @param {import('../gameobjects/units/Player.js')} player 
 * @param {typeof import('../packets/C2S/0x9C-SoftReconnect.js').struct} packet 
 */
export default (player, packet) => {
	console.log('handle: C2S.SoftReconnect');
	//console.log(packet);


};
