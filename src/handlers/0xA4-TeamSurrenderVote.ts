
/**
 * 
 * @param {import('../gameobjects/units/Player.js')} player 
 * @param {typeof import('../packets/C2S/0xA4-TeamSurrenderVote.js').struct} packet 
 */
export default (player, packet) => {
	console.log('handle: C2S.TeamSurrenderVote');
	//console.log(packet);


};
