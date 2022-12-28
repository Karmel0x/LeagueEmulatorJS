
var Packets = require('../../Packets');


for (var channelId in Packets) {
	if (!Packets[channelId].name)
		continue;

	var channelName = Packets[channelId].name;

	Packets[channelId].id = parseInt(channelId);
	Packets[channelName] = Packets[channelId];

	for (var packetId in Packets[channelId]) {
		if (!Packets[channelId][packetId].name)
			continue;

		var packetName = Packets[channelId][packetId].name;

		Packets[channelId][packetId].id = parseInt(packetId);
		Packets[channelId][packetId].channel = parseInt(channelId);
		Packets[channelId][packetId].channelName = channelName;
		Packets[channelId][packetName] = Packets[channelId][packetId];
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

		var packetSizeCount = 0;
		for (var i in packet) {
			packetSizeCount += packetSize(packet[i], source[i] || 0);
			//console.log(packet[i], packetSizeCount);
		}
		return packetSizeCount;
	}
	return 0;
}
const PacketsSizes = {};
for (var i in Packets.cmd)
	if (typeof Packets.cmd[i].packet != 'undefined')
		PacketsSizes[Packets.cmd[i].id] = packetSize(Packets.cmd[i].packet);
*/

module.exports = Packets;
