
/**
 * 
 * @param {import('../gameobjects/units/Player.js')} player 
 * @param {typeof import('../packets/C2S/0x0106-UnitSendDrawPath.js').struct} packet 
 */
export default (player, packet) => {
	console.log('handle: C2S.UnitSendDrawPath');
	//console.log(packet);

};
