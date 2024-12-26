
import Player from '../gameobjects/units/player';
import * as packets from '@repo/packets/list';

import { SlotId } from '../constants/slot-id';


export default (player: Player, packet: packets.CastSpellReqModel) => {
	console.log('handle: c2s.CastSpellReq');
	//console.log(packet);

	if (packet.slot >= SlotId.Q && packet.slot <= SlotId.F)
		player.combat.castSpell(packet);
	//else if (packet.slot >= SlotId.A && packet.slot <= SlotId.A9)
	//	player.combat.castAttack(packet);
	else if (packet.slot >= SlotId.I && packet.slot <= SlotId.I7)
		player.inventory.castItem(packet);

};
