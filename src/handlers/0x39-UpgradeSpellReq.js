

/**
 * 
 * @param {import('../gameobjects/units/Player')} player 
 * @param {*} packet 
 */
module.exports = (player, packet) => {
	console.log('handle: C2S.UpgradeSpellReq');
	//console.log(packet);


	player.progress.skillUpgrade(packet.slot, packet.bitfield.isEvolve);
};
