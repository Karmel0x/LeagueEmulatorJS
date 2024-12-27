
import * as packets from '@repo/packets/list';
import Player from '../gameobjects/unit-ai/player';


export default (player: Player, packet: packets.SwapItemReqModel) => {
	console.log('handle: c2s.SwapItemReq');
	//console.log(packet);

	const owner = player.owner;
	owner.inventory.swapItems(packet.source, packet.destination);

};
