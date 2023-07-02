const Server = require("../app/Server");

/**
 * 
 * @param {import('../gameobjects/units/Player')} player 
 * @param {*} packet 
 */
module.exports = (player, packet) => {
	console.log('handle: C2S.PlayEmote');
	//console.log(packet);

	{
		const PlayEmote = Server.network.createPacket('PlayEmote');
		PlayEmote.netId = player.netId;
		PlayEmote.emoteId = packet.emoteId;
		player.packets.toVision(PlayEmote);
	}

};
