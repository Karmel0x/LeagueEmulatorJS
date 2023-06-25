
const fs = require('fs');

require('../../../src/core/init_utilities');
const _replayreaders = require('../../_replayreaders');
const HandlersParse = require('../../../src/core/network/parse');

const WaypointsDrawer = require('../WaypointsDrawer');


var waypointsDrawer = {};

//var replayDir = '../LeagueEmulatorJS_replays/';
var replayDir = 'E:\\Games\\lol\\replays\\ReplayStuff\\4.20+\\';

var replayList = fs.readdirSync(replayDir).filter((value) => {
	return value.endsWith('.json') || value.endsWith('.lrpkt');
});

process();


function processReplay(replayUnpacked) {

	const packetId_WaypointGroup = 0x61;
	const packetId_SynchVersion = 0x54;

	var mapToLoad = 0;
	for (var j = 0; j < replayUnpacked.length; j++) {
		var packet = replayUnpacked[j];

		if (!packet.BytesBuffer || packet.BytesBuffer.length < 6)
			continue;

		var firstByte = packet.BytesBuffer.readUInt8(0);
		if (firstByte != packetId_WaypointGroup && firstByte != packetId_SynchVersion)
			continue;

		if (firstByte == packetId_SynchVersion && packet.BytesBuffer.length < 500)
			return;

		var parsed = HandlersParse.parsePacket({
			channel: packet.Channel,
			buffer: packet.BytesBuffer,
		});

		if (!parsed)
			continue;

		if (firstByte == packetId_WaypointGroup && !parsed.movementData)
			return;

		if (firstByte == packetId_SynchVersion && !parsed.mapToLoad)
			return;

		if (parsed.mapToLoad) {
			mapToLoad = parsed.mapToLoad;
			//console.log('mapToLoad:', mapToLoad);
			waypointsDrawer[mapToLoad] = waypointsDrawer[mapToLoad] || new WaypointsDrawer(mapToLoad);
		}

		if (!parsed.movementData || parsed.movementData.length < 1)
			continue;

		if (!waypointsDrawer[mapToLoad])
			return;

		for (var k = 0; k < parsed.movementData.length; k++) {
			var movementData = parsed.movementData[k];
			if (!movementData || !movementData.waypoints || movementData.waypoints.length < 3)
				continue;

			waypointsDrawer[mapToLoad].drawWaypoints(movementData.waypoints);
			//console.log(packet, parsed);
		}
	}
}
async function process() {
	for (var i = 0; i < replayList.length; i++) {
		var replayFilename = replayList[i];
		var replayUnpacked = _replayreaders(replayDir + replayFilename);
		processReplay(replayUnpacked);

		console.log(replayFilename, '>', 'done');
		await Promise.wait(1000);
		//break;
	}
	console.log('>>> all files done');
}
