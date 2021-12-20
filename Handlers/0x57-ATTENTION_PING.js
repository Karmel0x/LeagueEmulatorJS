
const Packets = require('../Core/Packets');
const {createPacket, sendPacket} = require('../Core/PacketUtilities');
const { Vector2 } = require("three");


module.exports = (player, packet) => {
	console.log('handle: C2S.ATTENTION_PING');
	//console.log(packet);


	{
		var ATTENTION_PING = createPacket('ATTENTION_PING');
		ATTENTION_PING.Position = packet.Position;
		ATTENTION_PING.TargetNetID = packet.TargetNetID;
		ATTENTION_PING.SourceNetID = player.netId;
		ATTENTION_PING.PingCategory = packet.PingCategory;
		ATTENTION_PING.bitfield = {//0xFB
			PlayAudio: true,
			ShowChat: true,
			PingThrottled: false,
			PlayVO: true,
		};
		player.packetController.sendTo_team(ATTENTION_PING);
	}

	//test
	var pos = new Vector2(packet.Position.x, packet.Position.y);
	global.Units['RED'].Minion[Object.keys(global.Units['RED'].Minion)[0]]?.Movement.move1(pos);

};
