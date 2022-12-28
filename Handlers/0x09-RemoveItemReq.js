

module.exports = (player, packet) => {
	console.log('handle: C2S.RemoveItemReq');
	//console.log(packet);

	if (packet.bitfield.sell)
		player.sellItem(packet.slot);
};
