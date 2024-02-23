
import Parser from '@workspace/network/packages/network/parser';
import '@workspace/packets/packages/packets/register';
import { ReplayRecord } from '../_replayreaders/replay-reader';
import RelativeDataView from '@workspace/network/packages/relative-data-view';
import Registry from '@workspace/network/packages/network/registry';
import * as packets from '@workspace/packets/packages/packets';
import { PacketDebugger } from '@workspace/network/packages/packets/packet';
import { channels } from '@workspace/packets/packages/packets/channels';


function findPacketById(packetId: number, channel: number | undefined) {

	let packet = Registry.base.packets[packetId];
	if (packet) {
		if (channel === undefined || packet.channel === channel)
			return packet;
	}

	let packet2 = Registry.primary.packets[packetId];
	if (packet2) {
		if (channel === undefined || packet2.channel === channel)
			return packet2;
	}

	return undefined;
}

export default function packetParser(packet1: ReplayRecord, i: number) {
	if (!packet1.data)
		return false;

	let packetData = packet1.data;
	let dvr = RelativeDataView.from(packetData);

	let packetId = dvr.readUint8();

	if (packetId == packets.Ping_Load_InfoS2CU.id)
		return false;
	if (packetId == 0xFF)
		return false;

	let packetClass = findPacketById(packetId, packet1.channel);
	let packetChannel = packet1.channel || packetClass?.channel || 0;

	let bytes = Buffer.from(packetData).toString('hex');
	let parsed = Parser.parse({
		channel: packetChannel || 0,
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
		channelName: channels[packetClass?.channel || 0],
		packetName: packetClass?.name,
	};

	return packetDetails;
}
