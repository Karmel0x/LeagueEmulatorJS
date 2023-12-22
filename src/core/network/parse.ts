import PrimaryPacket from '../../packets/PrimaryPacket';
import BasePacket from '../../packets/BasePacket';
import ExtendedPacket from '../../packets/ExtendedPacket';
import PacketReaderWriter from './binary-packet-struct/index';

import '../../packets/index';
import Server from '../../app/Server';


export function readPacket(channel: number, cmd: number, packetReaderWriter: PacketReaderWriter) {
	let channelPackets = Server.packets[channel];
	if (!channelPackets) {
		console.log('channel not defined', channel, cmd, '(', channel.toString(16), cmd.toString(16), ')');
		return;
	}

	let Packet = channelPackets[cmd];
	if (!Packet) {
		console.log('packet not defined', channel, cmd, '(', channel.toString(16), cmd.toString(16), ')');
		return;
	}

	let packet = Packet.from(packetReaderWriter);
	return packet.content;
}

export function parsePacket(packet: PacketMessage) {
	const packetReaderWriter = PacketReaderWriter.from(packet.buffer);
	let head = packetReaderWriter.read(PrimaryPacket.struct_header) as { [key: string]: any };

	if (head.cmd == 0xFE) {
		packetReaderWriter.offset = 0;
		head = packetReaderWriter.read(ExtendedPacket.struct_header);
	}

	if (head.cmd == 0xFF) {
		// @todo BatchPacket
		packetReaderWriter.offset = 0;
		return;
	}

	try {
		packetReaderWriter.offset = 0;
		let content = readPacket(packet.channel, head.cmd, packetReaderWriter);

		return content;
	}
	catch (e) {
		console.log('error parsing packet on offset', packetReaderWriter.offset, e);
		console.log('packet', packet);
		return;
	}
}
