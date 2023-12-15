

/**
 * 
 * @param {import('../gameobjects/units/Player.js')} player 
 * @param {typeof import('../packets/C2S/0x20-SwapItemReq.js').struct} packet 
 */
export default (player, packet) => {
	console.log('handle: C2S.SwapItemReq');
	//console.log(packet);

	player.inventory.swapItems(packet.sourceSlot, packet.destinationSlot);
};
