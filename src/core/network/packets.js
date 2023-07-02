
const packets = require('../../packets');


for (let channelId in packets) {
	if (!packets[channelId].name)
		continue;

	let channelName = packets[channelId].name;

	packets[channelId].id = parseInt(channelId);
	packets[channelName] = packets[channelId];

	for (let packetId in packets[channelId]) {
		if (!packets[channelId][packetId].name)
			continue;

		let packetName = packets[channelId][packetId].name;

		packets[channelId][packetId].id = parseInt(packetId);
		packets[channelId][packetId].channel = parseInt(channelId);
		packets[channelId][packetId].channelName = channelName;
		packets[channelId][packetName] = packets[channelId][packetId];
	}
}

/*
static packetSize(packet, source = false){

	if (typeof packet == 'string') {
		if (packet == 'string')
			return source.length + 5;
		return Buffer.typeSize[packet];
	}
	if (typeof packet == 'object') {
		if (Array.isArray(packet))
			return packet[1] ? packetSize(packet[0]) * packet[1] : 0;

		let packetSizeCount = 0;
		for (let i in packet) {
			packetSizeCount += packetSize(packet[i], source[i] || 0);
			//console.log(packet[i], packetSizeCount);
		}
		return packetSizeCount;
	}
	return 0;
}
const PacketsSizes = {};
for (let i in packets.cmd)
	if (typeof packets.cmd[i].packet != 'undefined')
		PacketsSizes[packets.cmd[i].id] = packetSize(packets.cmd[i].packet);
*/

module.exports = packets;
