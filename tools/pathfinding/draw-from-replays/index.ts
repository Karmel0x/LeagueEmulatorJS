
import fs from 'fs';
import _replayreaders from '../../_replayreaders/index';
import Parser from '@workspace/network/packages/network/parser';
import WaypointsDrawer from '../waypoints-drawer';
import { ReplayRecord } from '../../_replayreaders/replay-reader';
import RelativeDataView from '@workspace/network/packages/relative-data-view';
import { SynchVersionModel } from '@workspace/packets/packages/packets/base/s2c/0x54-SynchVersion';
import { WaypointGroupModel } from '@workspace/packets/packages/packets/base/s2cUnreliable/0x61-WaypointGroup';
import { delay } from '../../utils';

let waypointsDrawer: { [mapId: number]: WaypointsDrawer } = {};

let replayDir = '../temp/replays/';

let replayList = fs.readdirSync(replayDir).filter((value) => {
	return value.endsWith('.json') || value.endsWith('.lrpkt');
});

process();

function processReplay(replayUnpacked: ReplayRecord[]) {

	const packetId_WaypointGroup = 0x61;
	const packetId_SynchVersion = 0x54;

	let mapToLoad = 0;
	for (let j = 0; j < replayUnpacked.length; j++) {
		let packet = replayUnpacked[j];

		if (!packet.data || packet.data.byteLength < 6)
			continue;

		let dvr = RelativeDataView.from(packet.data);
		let packetId = dvr.readUint8();
		if (packetId != packetId_WaypointGroup && packetId != packetId_SynchVersion)
			continue;

		if (packetId == packetId_SynchVersion && packet.data.byteLength < 500)
			return;

		let parsed = Parser.parse({
			channel: packet.channel || 0,
			data: packet.data,
		});

		if (!parsed)
			continue;

		if (packetId == packetId_SynchVersion) {
			let parsed1 = parsed as SynchVersionModel;
			if (!parsed1.mapToLoad)
				continue;

			mapToLoad = parsed1.mapToLoad;
			//console.log('mapToLoad:', mapToLoad);
			waypointsDrawer[mapToLoad] = waypointsDrawer[mapToLoad] || new WaypointsDrawer(mapToLoad);
		}


		if (packetId == packetId_WaypointGroup) {
			let parsed1 = parsed as WaypointGroupModel;
			if (!parsed1.movementData || parsed1.movementData.length < 1)
				continue;

			if (!waypointsDrawer[mapToLoad])
				return;

			for (let k = 0; k < parsed1.movementData.length; k++) {
				let movementData = parsed1.movementData[k];
				if (!movementData || !movementData.waypoints || movementData.waypoints.length < 3)
					continue;

				waypointsDrawer[mapToLoad].drawWaypoints(movementData.waypoints);
				//console.log(packet, parsed);
			}
		}

	}
}
async function process() {
	for (let i = 0; i < replayList.length; i++) {
		let replayFilename = replayList[i];
		let replayUnpacked = _replayreaders(replayDir + replayFilename);
		processReplay(replayUnpacked);

		console.log(replayFilename, '>', 'done');
		await delay(1000);
		//break;
	}
	console.log('>>> all files done');
}
