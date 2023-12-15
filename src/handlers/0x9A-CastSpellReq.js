import slotId from '../constants/slotId.js';

/**
 * 
 * @param {import('../gameobjects/units/Player.js')} player 
 * @param {typeof import('../packets/C2S/0x9A-CastSpellReq.js').struct} packet 
 */
export default (player, packet) => {
	console.log('handle: C2S.CastSpellReq');
	//console.log(packet);

	if (packet.slot >= slotId.Q && packet.slot <= slotId.F)
		player.combat.castSpell(packet);
	else if (packet.slot >= slotId.A && packet.slot <= slotId.A9)
		player.combat.castAttack(packet);
	else if (packet.slot >= slotId.I && packet.slot <= slotId.I7)
		player.inventory.castItem(packet);

};
