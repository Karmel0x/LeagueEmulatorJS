
/**
 * 
 * @param {import('../gameobjects/units/Player.js')} player 
 * @param {typeof import('../packets/C2S/0xA8-OnReplication_Acc.js').struct} packet 
 */
export default (player, packet) => {
	console.log('handle: C2S.OnReplication_Acc');
	//console.log(packet);


};
