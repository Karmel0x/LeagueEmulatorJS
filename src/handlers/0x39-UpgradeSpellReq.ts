

/**
 * 
 * @param {import('../gameobjects/units/Player.js')} player 
 * @param {typeof import('../packets/C2S/0x39-UpgradeSpellReq.js').struct} packet 
 */
export default (player, packet) => {
	console.log('handle: C2S.UpgradeSpellReq');
	//console.log(packet);


	player.progress.skillUpgrade(packet.slot, packet.bitfield.isEvolve);
};
