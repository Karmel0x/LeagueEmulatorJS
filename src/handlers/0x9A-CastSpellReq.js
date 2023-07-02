const slotId = require('../constants/slotId');

/**
 * 
 * @param {import('../gameobjects/units/Player')} player 
 * @param {*} packet 
 */
module.exports = (player, packet) => {
	console.log('handle: C2S.CastSpellReq');
	//console.log(packet);

	if (packet.slot >= slotId.Q && packet.slot <= slotId.F)
		player.combat.castSpell(packet);
	else if (packet.slot >= slotId.A && packet.slot <= slotId.A9)
		player.combat.castAttack(packet);
	else if (packet.slot >= slotId.I && packet.slot <= slotId.I7)
		player.inventory.castItem(packet);

};
