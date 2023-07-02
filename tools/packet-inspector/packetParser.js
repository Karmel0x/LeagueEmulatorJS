
const HandlersParse = require('../../src/core/network/parse');
const BatchPacket = require('../../src/packets/BatchPacket');
const BasePacket = require('../../src/packets/BasePacket');
const packets = require('../../src/core/network/packets');


let packetId = 0;

function findChannelIdByPacketId(packetId) {
	for (let channelId in packets) {
		if (packets[channelId][packetId])
			return channelId;
	}
	return null;
}

function packetParser(packet1) {

	let buffer;
	if (packet1.Bytes || packet1.BytesB64)
		buffer = Buffer.from(packet1.Bytes || packet1.BytesB64, 'base64');
	else if (packet1.BytesHex)
		buffer = Buffer.from(packet1.BytesHex.split(' ').join('').split('-').join(''), 'hex');
	else if (packet1.BytesBuffer)
		buffer = packet1.BytesBuffer;

	if (!buffer)
		return false;

	packet1.Id = packet1.Id ?? ++packetId;
	packet1.Time = Math.round((packet1.Time ?? ((packet1.TimeS ?? 0) * 1000)) * 1000) / 1000;
	packet1.Channel = packet1.Channel || findChannelIdByPacketId(buffer.readUInt8(0));

	let bytes = buffer.toString('hex').match(/../g)?.join(' ') || '';
	let parsed = HandlersParse.parsePacket({
		channel: packet1.Channel,
		buffer: buffer,
	});

	if (parsed.cmd == 0x95)//Ping_Load_Info
		return false;

	if (parsed.cmd == 0xFF) {
		buffer.off = 0;
		let batchPackets = new BatchPacket();
		batchPackets.reader(buffer);//console.log(batchPackets);
		parsed = batchPackets;
	}

	let parsedStr = '';
	try {
		parsedStr = JSON.stringify(parsed, (key, value) =>
			typeof value == "bigint" ? value.toString() + "n" : value, 2);
	} catch (e) { }

	let packetData = {
		Id: packet1.Id,
		Time: packet1.Time,
		Channel: parsed.channel,
		Bytes: bytes,
		Parsed: parsedStr,
		channelName: parsed.channelName,
		cmdName: parsed.name,
		offDEBUG: JSON.stringify(Buffer.offDEBUG),
		peerNums: packet1.peerNums || [],
	};

	return packetData;
};

module.exports = packetParser;
