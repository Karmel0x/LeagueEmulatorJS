

module.exports = (player, packet) => {
	console.log('handle: C2S.CastSpellReq');
	//console.log(packet);

	//if(packet.slot >= 0 && packet.slot <= 3)
	//	player.character.castSpell(packet);
	//else if(packet.slot >= 4 && packet.slot <= 5)
	//	player.summonerSpells.castSpell(packet);
	//else if(packet.slot >= 6 && packet.slot <= 12)
	//	player.inventory.castSpell(packet);
	player.castSpell(packet);
};
