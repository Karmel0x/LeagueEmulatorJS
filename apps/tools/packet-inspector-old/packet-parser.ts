
import { PacketDebugger } from '@repo/network/packets/packet';
import Parser from '@repo/network/parser';
import RelativeDataView from '@repo/network/relative-data-view';
import { channels } from '@repo/packets/channels';
import * as packets from '@repo/packets/list';
import '@repo/packets/register';
import type { ReplayRecord } from './_replayreaders/replay-reader';


export default function packetParser(packet1: ReplayRecord, i: number) {
	if (!packet1.data)
		return false;
	if (packet1.channel === undefined)
		return false;

	let packetData = packet1.data;
	let dvr = RelativeDataView.from(packetData);

	let packetId = dvr.readUint8();

	//if (packetId === packets.Ping_Load_InfoS2C.id)
	//	return false;
	if (packetId === 0xFF)
		return false;
	//if (packet1.channel === 0)
	//	return false;
	if (packetId === packets.AddListener.id)
		return false;

	try {
		let packetClass = Parser.getPacketClass(packet1.channel, packetId);
		let packetChannel = packet1.channel ?? packetClass?.channel ?? -1;

		let bytes = Buffer.from(packetData).toString('hex');
		let parsed = Parser.parse({
			channel: packetChannel,
			data: packetData,
		});
		let debugOffsets = PacketDebugger.offsets;

		let parsedJson = JSON.stringify(parsed, (key, value) => typeof value === "bigint" ? `${value}n` : value, 2);
		let debugOffsetsJson = JSON.stringify(debugOffsets, undefined, 2);

		let packetDetails = {
			num: i,
			time: packet1.time,
			packetId,
			packetChannel,
			bytes,
			parsedJson,
			debugOffsetsJson,
			peerNums: packet1.peerNums,
			channelName: channels[packetChannel] || '',
			packetName: packetClass?.name,
		};

		return packetDetails;
	}
	catch (e) {
		console.log('error parsing packet', e);
		return false;
	}
}
