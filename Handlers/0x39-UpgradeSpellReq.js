

module.exports = (player, packet) => {
	console.log('handle: C2S.UpgradeSpellReq');
	//console.log(packet);

	
	player.skillUpgrade(packet.slot, packet.bitfield.isEvolve);
};
