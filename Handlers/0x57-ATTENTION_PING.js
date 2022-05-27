
const Packets = require('../Core/Packets');
const {createPacket, sendPacket} = require('../Core/PacketUtilities');
const { Vector2 } = require("three");


module.exports = (player, packet) => {
	console.log('handle: C2S.ATTENTION_PING');
	//console.log(packet);


	{
		var ATTENTION_PING = createPacket('ATTENTION_PING');
		ATTENTION_PING.position = packet.position;
		ATTENTION_PING.TargetNetId = packet.TargetNetId;
		ATTENTION_PING.SourceNetId = player.netId;
		ATTENTION_PING.PingCategory = packet.PingCategory;
		ATTENTION_PING.bitfield = {//0xFB
			PlayAudio: true,
			ShowChat: true,
			PingThrottled: false,
			PlayVO: true,
		};
		player.sendTo_team(ATTENTION_PING);
	}

	//test
	var pos = new Vector2(packet.position.x, packet.position.y);
	var redMinionUnits = global.getUnitsF('RED', 'Minion');
	redMinionUnits[0]?.move1(pos);

};
