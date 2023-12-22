
import fs from 'fs';

import '../../src/core/init_utilities';
import _replayreaders from '../../_replayreaders/index';
import HandlersParse from '../../../src/core/network/parse';

import WaypointsDrawer from '../WaypointsDrawer';


let waypointsDrawer = {};

//let replayDir = '../LeagueEmulatorJS_replays/';
let replayDir = 'E:\\Games\\lol\\replays\\ReplayStuff\\4.20+\\';

let replayList = fs.readdirSync(replayDir).filter((value) => {
	return value.endsWith('.json') || value.endsWith('.lrpkt');
});

process();


function processReplay(replayUnpacked) {

	const packetId_WaypointGroup = 0x61;
	const packetId_SynchVersion = 0x54;

	let mapToLoad = 0;
	for (let j = 0; j < replayUnpacked.length; j++) {
		let packet = replayUnpacked[j];

		if (!packet.BytesBuffer || packet.BytesBuffer.length < 6)
			continue;

		let firstByte = packet.BytesBuffer.readUInt8(0);
		if (firstByte != packetId_WaypointGroup && firstByte != packetId_SynchVersion)
			continue;

		if (firstByte == packetId_SynchVersion && packet.BytesBuffer.length < 500)
			return;

		let parsed = HandlersParse.parsePacket({
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

		for (let k = 0; k < parsed.movementData.length; k++) {
			let movementData = parsed.movementData[k];
			if (!movementData || !movementData.waypoints || movementData.waypoints.length < 3)
				continue;

			waypointsDrawer[mapToLoad].drawWaypoints(movementData.waypoints);
			//console.log(packet, parsed);
		}
	}
}
async function process() {
	for (let i = 0; i < replayList.length; i++) {
		let replayFilename = replayList[i];
		let replayUnpacked = _replayreaders(replayDir + replayFilename);
		processReplay(replayUnpacked);

		console.log(replayFilename, '>', 'done');
		await Promise.wait(1000);
		//break;
	}
	console.log('>>> all files done');
}
