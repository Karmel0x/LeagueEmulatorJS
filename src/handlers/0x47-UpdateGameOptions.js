
module.exports = (player, packet) => {
	console.log('handle: C2S.UpdateGameOptions');
	//console.log(packet);

	player.autoAttackToggle = packet.bitfield.autoAttackEnabled;
};
