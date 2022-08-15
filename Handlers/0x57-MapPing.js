
const { Vector2 } = require("three");


module.exports = (player, packet) => {
	console.log('handle: C2S.MapPing');
	//console.log(packet);


	{
		var MapPing = global.Network.createPacket('MapPing');
		MapPing.position = packet.position;
		MapPing.targetNetId = packet.targetNetId;
		MapPing.sourceNetId = player.netId;
		MapPing.pingCategory = packet.pingCategory;
		MapPing.bitfield = {//0xFB
			playAudio: true,
			showChat: true,
			pingThrottled: false,
			playVO: true,
		};
		player.sendTo_team(MapPing);
	}

	//test
	var pos = new Vector2(packet.position.x, packet.position.y);
	var redMinionUnits = global.getUnitsF('RED', 'Minion');
	redMinionUnits[0]?.move1(pos);

};
