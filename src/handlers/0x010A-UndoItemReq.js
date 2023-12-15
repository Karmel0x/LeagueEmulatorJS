
/**
 * 
 * @param {import('../gameobjects/units/Player.js')} player 
 * @param {typeof import('../packets/C2S/0x010A-UndoItemReq.js').struct} packet 
 */
export default (player, packet) => {
	console.log('handle: C2S.UndoItemReq');
	//console.log(packet);

	player.inventory.UndoHistory.remUndoHistory();
};
