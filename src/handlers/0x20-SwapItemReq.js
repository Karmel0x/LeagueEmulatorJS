

/**
 * 
 * @param {import('../gameobjects/units/Player')} player 
 * @param {*} packet 
 */
module.exports = (player, packet) => {
	console.log('handle: C2S.SwapItemReq');
	//console.log(packet);

	player.inventory.swapItems(packet.sourceSlot, packet.destinationSlot);
};
