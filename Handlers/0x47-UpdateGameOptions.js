const UpdateGameOptions = require("../Packets/C2S/0x47-UpdateGameOptions");

/**
 * @todo save settings on player account
 * @param {Player} player 
 * @param {UpdateGameOptions.struct} packet 
 */
module.exports = (player, packet) => {
	console.log('handle: C2S.UpdateGameOptions');
	//console.log(packet);

	player.autoAttackToggle = packet.bitfield.autoAttackEnabled;
};
