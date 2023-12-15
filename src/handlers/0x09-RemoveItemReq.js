
/**
 * 
 * @param {import('../gameobjects/units/Player.js')} player 
 * @param {typeof import('../packets/C2S/0x09-RemoveItemReq.js').struct} packet 
 */
export default (player, packet) => {
	console.log('handle: C2S.RemoveItemReq');
	//console.log(packet);

	if (packet.bitfield.sell)
		player.inventory.sellItem(packet.slot);
};
