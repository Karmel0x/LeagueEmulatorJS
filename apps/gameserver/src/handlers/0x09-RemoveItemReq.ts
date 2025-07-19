
import type * as packets from '@repo/packets/list';
import type Player from '../gameobjects/unit-ai/player';


export default (player: Player, packet: packets.RemoveItemReqModel) => {
	console.log('handle: c2s.RemoveItemReq');
	//console.log(packet);

	const owner = player.owner;
	if (packet.sell)
		owner.inventory.sellItem(packet.slot);

};
