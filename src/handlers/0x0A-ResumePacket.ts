
/**
 * 
 * @param {import('../gameobjects/units/Player.js')} player 
 * @param {typeof import('../packets/C2S/0x0A-ResumePacket.js').struct} packet 
 */
export default (player, packet) => {
	console.log('handle: C2S.ResumePacket');
	//console.log(packet);


};
