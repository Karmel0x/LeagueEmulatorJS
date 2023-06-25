const Server = require("../app/Server");

module.exports = (player, packet) => {
	console.log('handle: C2S.PlayEmote');
	//console.log(packet);

	{
		var PlayEmote = Server.network.createPacket('PlayEmote');
		PlayEmote.netId = player.netId;
		PlayEmote.emoteId = packet.emoteId;
		player.sendTo_vision(PlayEmote);
	}

};
