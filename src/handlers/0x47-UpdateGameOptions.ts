
/**
 * 
 * @param {import('../gameobjects/units/Player.js')} player 
 * @param {typeof import('../packets/C2S/0x47-UpdateGameOptions.js').struct} packet 
 */
export default (player, packet) => {
	console.log('handle: C2S.UpdateGameOptions');
	//console.log(packet);

	player.combat.autoAttackToggle = packet.bitfield.autoAttackEnabled;
};
