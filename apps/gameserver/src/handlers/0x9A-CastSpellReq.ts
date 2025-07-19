
import type * as packets from '@repo/packets/list';
import type Player from '../gameobjects/unit-ai/player';

import { SlotId } from '../constants/slot-id';


export default (player: Player, packet: packets.CastSpellReqModel) => {
	console.log('handle: c2s.CastSpellReq');
	//console.log(packet);

	const slot = packet.slot;

	const owner = player.owner;
	if (slot >= SlotId.q && slot <= SlotId.f)
		owner.combat.castSpell(packet);
	//else if (slot >= SlotId.a && slot <= SlotId.a9)
	//	owner.combat.startAttack(packet);
	else if (slot >= SlotId.i && slot <= SlotId.i7)
		owner.inventory.castItem(packet);

};
