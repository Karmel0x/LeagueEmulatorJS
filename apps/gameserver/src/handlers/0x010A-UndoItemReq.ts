
import type * as packets from '@repo/packets/list';
import type Player from '../gameobjects/unit-ai/player';


export default (player: Player, packet: packets.UndoItemReqModel) => {
	console.log('handle: c2s.UndoItemReq');
	//console.log(packet);

	//const owner = player.owner;
	//owner.inventory.undoHistory.remUndoHistory();

};
