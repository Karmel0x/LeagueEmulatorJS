
/**
 * 
 * @param {import('../gameobjects/units/Player.js')} player 
 * @param {typeof import('../packets/C2S/0x49-PlayVOCommand.js').struct} packet 
 */
export default (player, packet) => {
	console.log('handle: C2S.PlayVOCommand');
	//console.log(packet);


};
