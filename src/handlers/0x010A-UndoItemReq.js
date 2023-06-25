

module.exports = (player, packet) => {
	console.log('handle: C2S.UndoItemReq');
	//console.log(packet);

	player.UndoHistory.remUndoHistory();
};
