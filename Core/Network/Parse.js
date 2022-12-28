const BasePacket = require("../../Packets/BasePacket");
const ExtendedPacket = require("../../Packets/ExtendedPacket");
const Packets = require("./Packets");


/**
 * @param {Buffer} buffer 
 * @param {Number} channel Packets[channel]
 * @param {Number} cmd Packets[channel][cmd]
 * @returns {Object}
 */
function parseBody(buffer, channel, cmd) {
	var pkt = {};
	if (typeof Packets[channel] == 'undefined' || typeof Packets[channel][cmd] == 'undefined') {
		pkt.error = ['packet not defined', {
			channel,
			cmd,
			channelName: Packets[channel]?.name,
			cmdName: Packets[channel]?.[cmd]?.name,
			channelHex: (channel && channel.toString ? channel.toString(16) : ''),
			cmdHex: (cmd && cmd.toString ? cmd.toString(16) : ''),
		}];
		console.log(pkt.error, buffer);
		return pkt;
	}

	pkt = new Packets[channel][cmd](buffer);
	pkt.cmd = cmd;
	return pkt.content;
}

/**
 * @param {Object} packet {buffer, channel}
 * @returns {Object}
 */
function parsePacket(packet) {
	packet.buffer.off = 0;
	var pkt = packet.buffer.readobj(BasePacket.struct_header);

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
