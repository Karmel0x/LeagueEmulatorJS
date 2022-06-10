
const {createPacket, sendPacket} = require('../Core/PacketUtilities');


module.exports = (player, packet) => {
	console.log('handle: C2S.PlayEmote');
	//console.log(packet);

	{
		var PlayEmote = createPacket('PlayEmote');
		PlayEmote.netId = player.netId;
		PlayEmote.emoteId = packet.emoteId;
		player.sendTo_vision(PlayEmote);
	}

};
