
/**
 * 
 * @param {import('../gameobjects/units/Player.js')} player 
 * @param {typeof import('../packets/C2S/0xD6-OnRespawnPointEvent.js').struct} packet 
 */
export default (player, packet) => {
	console.log('handle: C2S.OnRespawnPointEvent');
	//console.log(packet);


};
