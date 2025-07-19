
import type * as packets from '@repo/packets/list';
import type Player from '../gameobjects/unit-ai/player';


export default (player: Player, packet: packets.BuyItemReqModel) => {
	console.log('handle: c2s.BuyItemReq');
	//console.log(packet);

	const owner = player.owner;
	owner.inventory.buyItem(packet.itemId);

};
