
import Player from '../gameobjects/units/player';
import * as packets from '@workspace/packets/packages/packets';


export default (player: Player, packet: packets.RemoveItemReqModel) => {
	console.log('handle: c2s.RemoveItemReq');
	//console.log(packet);

	if (packet.sell)
		player.inventory.sellItem(packet.slot);
};
