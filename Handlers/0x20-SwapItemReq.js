

module.exports = (player, packet) => {
    console.log('handle: C2S.SwapItemReq');
	//console.log(packet);

	player.swapItems(packet.sourceSlot, packet.destinationSlot);
};
