const BasePacket = require("../../packets/BasePacket");
const ExtendedPacket = require("../../packets/ExtendedPacket");
const packets = require("./packets");


/**
 * @param {Buffer} buffer 
 * @param {Object} channel packets[channel]
 * @param {number} cmd packets[channel][cmd]
 * @returns {Object}
 */
function parseBody(buffer, channel, cmd) {
	let pkt = {};
	if (typeof packets[channel] == 'undefined' || typeof packets[channel][cmd] == 'undefined') {
		pkt.error = ['packet not defined', {
			channel,
			cmd,
			channelName: packets[channel]?.name,
			cmdName: packets[channel]?.[cmd]?.name,
			channelHex: (channel && channel.toString ? channel.toString(16) : ''),
			cmdHex: (cmd && cmd.toString ? cmd.toString(16) : ''),
		}];
		console.log(pkt.error, buffer);
		return pkt;
	}

	pkt = new packets[channel][cmd](buffer);
	pkt.cmd = cmd;
	return pkt.content;
}

/**
 * @param {PacketMessage} packet
 * @returns {Object}
 */
function parsePacket(packet) {
	packet.buffer.off = 0;
	let pkt = packet.buffer.readobj(BasePacket.struct_header);

	if (pkt.cmd == 0xFE) {
		packet.buffer.off = 0;
		pkt = packet.buffer.readobj(ExtendedPacket.struct_header);
	}
	if (pkt.cmd == 0xFF) {
		packet.buffer.off = 0;
		return pkt;
	}

	packet.buffer.off = 0;
	pkt = parseBody(packet.buffer, packet.channel, pkt.cmd);

	packet.buffer.off = 0;
	return pkt;
}

module.exports = { parseBody, parsePacket };
