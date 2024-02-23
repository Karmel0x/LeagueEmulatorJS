
import Player from '../gameobjects/units/player';
import * as packets from '@workspace/packets/packages/packets';


export default (player: Player, packet: packets.BuyItemReqModel) => {
	console.log('handle: c2s.BuyItemReq');
	//console.log(packet);

	player.inventory.buyItem(packet.itemId);
};
