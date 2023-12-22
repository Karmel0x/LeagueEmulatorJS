
/**
 * 
 * @param {import('../gameobjects/units/Player.js')} player 
 * @param {typeof import('../packets/C2S/0xFB-TeamBalanceVote.js').struct} packet 
 */
export default (player, packet) => {
	console.log('handle: C2S.TeamBalanceVote');
	//console.log(packet);


};
