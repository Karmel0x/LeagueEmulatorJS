
const { Vector2 } = require("three");
const UnitList = require("../app/UnitList");
const Server = require("../app/Server");
const Team = require("../gameobjects/extensions/traits/Team");


/**
 * 
 * @param {import('../gameobjects/units/Player')} player 
 * @param {*} packet 
 */
module.exports = (player, packet) => {
	console.log('handle: C2S.MapPing');
	//console.log(packet);


	{
		const MapPing = Server.network.createPacket('MapPing');
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
		player.packets.toTeam(MapPing);
	}

	//test
	let pos = new Vector2(packet.position.x, packet.position.y);
	let redMinionUnits = /** @type {import("../gameobjects/units/Minion")[]} */ (/** @type {*} */(UnitList.getUnitsF(Team.TEAM_RED, 'Minion')));
	redMinionUnits[0]?.moving.move1(pos);

};
