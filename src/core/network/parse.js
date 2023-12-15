import PrimaryPacket from '../../packets/PrimaryPacket.js';
import BasePacket from '../../packets/BasePacket.js';
import ExtendedPacket from '../../packets/ExtendedPacket.js';
import PacketReaderWriter from './binary-packet-struct/index.js';

import '../../packets/index.js';
import Server from '../../app/Server.js';


/**
 * @param {number} channel packets[channel]
 * @param {number} cmd packets[channel][cmd]
 * @param {PacketReaderWriter} packetReaderWriter 
 * @returns 
 */
export function readPacket(channel, cmd, packetReaderWriter) {
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

/**
 * @param {PacketMessage} packet
 * @returns 
 */
export function parsePacket(packet) {
	const packetReaderWriter = PacketReaderWriter.from(packet.buffer);
	let head = /** @type {Object.<string, any>} */ (packetReaderWriter.read(PrimaryPacket.struct_header));

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
