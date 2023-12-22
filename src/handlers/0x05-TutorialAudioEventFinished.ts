
/**
 * 
 * @param {import('../gameobjects/units/Player.js')} player 
 * @param {typeof import('../packets/C2S/0x05-TutorialAudioEventFinished.js').struct} packet 
 */
export default (player, packet) => {
	console.log('handle: C2S.TutorialAudioEventFinished');
	//console.log(packet);


};
