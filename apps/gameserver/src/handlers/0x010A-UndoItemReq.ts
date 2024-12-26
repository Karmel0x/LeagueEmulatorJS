
import Player from '../gameobjects/units/player';
import * as packets from '@repo/packets/list';


export default (player: Player, packet: packets.UndoItemReqModel) => {
	console.log('handle: c2s.UndoItemReq');
	//console.log(packet);

	player.inventory.undoHistory.remUndoHistory();
};
