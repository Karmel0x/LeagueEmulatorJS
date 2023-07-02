
/**
 * 
 * @param {import('../gameobjects/units/Player')} player 
 * @param {*} packet 
 */
module.exports = (player, packet) => {
	console.log('handle: C2S.BuyItemReq');
	//console.log(packet);

	player.inventory.buyItem(packet.itemId);
};
