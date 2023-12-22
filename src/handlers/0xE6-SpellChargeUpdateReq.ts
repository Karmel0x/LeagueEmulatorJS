
/**
 * 
 * @param {import('../gameobjects/units/Player.js')} player 
 * @param {typeof import('../packets/C2S/0xE6-SpellChargeUpdateReq.js').struct} packet 
 */
export default (player, packet) => {
	console.log('handle: C2S.SpellChargeUpdateReq');
	//console.log(packet);


};
