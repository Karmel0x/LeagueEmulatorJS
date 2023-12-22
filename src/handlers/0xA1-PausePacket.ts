
/**
 * 
 * @param {import('../gameobjects/units/Player.js')} player 
 * @param {typeof import('../packets/C2S/0xA1-PausePacket.js').struct} packet 
 */
export default (player, packet) => {
	console.log('handle: C2S.PausePacket');
	//console.log(packet);


};
