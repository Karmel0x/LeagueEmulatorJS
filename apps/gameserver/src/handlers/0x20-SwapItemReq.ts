
import Player from '../gameobjects/units/player';
import * as packets from '@repo/packets/list';


export default (player: Player, packet: packets.SwapItemReqModel) => {
	console.log('handle: c2s.SwapItemReq');
	//console.log(packet);

	player.inventory.swapItems(packet.source, packet.destination);
};
