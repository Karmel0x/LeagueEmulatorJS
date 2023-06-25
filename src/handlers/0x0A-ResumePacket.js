
/**
 * 
 * @param {import('../gameobjects/units/Player')} player 
 * @param {typeof import('../packets/C2S/0x0A-ResumePacket').struct} packet 
 */
module.exports = (player, packet) => {
	console.log('handle: C2S.ResumePacket');
	//console.log(packet);


};
