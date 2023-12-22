
/**
 * 
 * @param {import('../gameobjects/units/Player.js')} player 
 * @param {typeof import('../packets/C2S/0x4B-OnScoreBoardOpened.js').struct} packet 
 */
export default (player, packet) => {
	console.log('handle: C2S.OnScoreBoardOpened');
	//console.log(packet);


};
