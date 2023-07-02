
/**
 * 
 * @param {import('../gameobjects/units/Player')} player 
 * @param {*} packet 
 */
module.exports = (player, packet) => {
	console.log('handle: C2S.UpdateGameOptions');
	//console.log(packet);

	player.combat.autoAttackToggle = packet.bitfield.autoAttackEnabled;
};
