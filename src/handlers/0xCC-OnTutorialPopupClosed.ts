
/**
 * 
 * @param {import('../gameobjects/units/Player.js')} player 
 * @param {typeof import('../packets/C2S/0xCC-OnTutorialPopupClosed.js').struct} packet 
 */
export default (player, packet) => {
	console.log('handle: C2S.OnTutorialPopupClosed');
	//console.log(packet);


};
