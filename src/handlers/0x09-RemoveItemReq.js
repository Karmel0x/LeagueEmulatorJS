
/**
 * 
 * @param {import('../gameobjects/units/Player')} player 
 * @param {*} packet 
 */
module.exports = (player, packet) => {
	console.log('handle: C2S.RemoveItemReq');
	//console.log(packet);

	if (packet.bitfield.sell)
		player.inventory.sellItem(packet.slot);
};
