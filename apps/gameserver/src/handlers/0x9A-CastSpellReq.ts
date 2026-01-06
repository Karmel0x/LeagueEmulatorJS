
import type * as packets from '@repo/packets/list';
import type Player from '../gameobjects/unit-ai/player';

import { IssueOrderType } from '@repo/packets/base/c2s/0x72-IssueOrderReq';
import { SlotId } from '../constants/slot-id';


export default (player: Player, packet: packets.CastSpellReqModel) => {
	console.log('handle: c2s.CastSpellReq');
	//console.log(packet);

	const owner = player.owner;
	owner.issueOrder(IssueOrderType.tempCastSpell);

	const slot = packet.slot;

	if (slot >= SlotId.q && slot <= SlotId.f)
		owner.combat.castSpell(packet);
	//else if (slot >= SlotId.a && slot <= SlotId.a9)
	//	owner.combat.startAttack(packet);
	else if (slot >= SlotId.i && slot <= SlotId.i7)
		owner.inventory.castItem(packet);

};
