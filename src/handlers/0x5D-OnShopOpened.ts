
/**
 * 
 * @param {import('../gameobjects/units/Player.js')} player 
 * @param {typeof import('../packets/C2S/0x5D-OnShopOpened.js').struct} packet 
 */
export default (player, packet) => {
	console.log('handle: C2S.OnShopOpened');
	//console.log(packet);


};
