
const enet = require('../../enetcppjs/build/Release/enetcppjs.node');
const Packets = require("./Packets");
require("./BufferExtend");
const fs = require("fs");


/*function packetSize(packet, source = false){

	if(typeof packet == 'string'){
		if(packet == 'string')
			return source.length + 5;
		return Buffer.typeSize[packet];
	}
	if(typeof packet == 'object'){
		if(Array.isArray(packet))
			return packet[1] ? packetSize(packet[0]) * packet[1] : 0;
		
		var packetSizeCount = 0;
		for(var i in packet){
			packetSizeCount += packetSize(packet[i], source[i] || 0);
			//console.log(packet[i], packetSizeCount);
		}
		return packetSizeCount;
	}
	return 0;
}
const PacketsSizes = {};
for(var i in Packets.cmd)
	if(typeof Packets.cmd[i].packet !== 'undefined')
		PacketsSizes[Packets.cmd[i].id] = packetSize(Packets.cmd[i].packet);
*/
function createPacket(packetName, channel = 'S2C'){
	if(typeof Packets[channel] === 'undefined' || typeof Packets[channel][packetName] === 'undefined'){
		console.log('packet is not yet implemented', channel, packetName);
		return {};
	}

	var packet = new (Packets[channel][packetName].packet || Packets.BasePacket);

	packet.cmd = Packets[channel][packetName].id;
	if(packet.cmd > 0xFF){
		packet.cmd = 0xFE;
		packet.cmd2 = Packets[channel][packetName].id;
	}

	packet.info = {
		channel: {
			id: Packets[channel].id,
			name: Packets[channel].name,
		},
		packet: {
			id: Packets[channel][packetName].id,
			name: Packets[channel][packetName].name,
		}
	};

	return packet;
}


function sendPacket(peer_num, packet){
	if(typeof packet === 'undefined'){
		//console.log('packet is not yet implemented', packet.id);
		return {};
	}

	var buffer = Buffer.allocUnsafe(packet.baseSize);
	//if(typeof packet.struct_header !== 'undefined')
	//	buffer.writeobj(packet.struct_header, packet);
	//if(typeof packet.struct !== 'undefined'){
	//	fill_packetTemplate_length(packet.struct, packet);
	//	buffer.writeobj(packet.struct, packet);
	//}
	//if(typeof packet.writer !== 'undefined')
		packet.writer(buffer);
	
	if(buffer.off && buffer.off != buffer.size){
		var bufferSize = buffer.off;
		buffer = Buffer.concat([buffer], buffer.off);
		buffer.off = bufferSize;
	}

	return sendPacket2(peer_num, packet, buffer);
}
function sendPacket2(peer_num, packet, buffer){//todo:peer
	logPackets({channel: packet.info.channel.id, buffer});

	console.debug('sent:', packet.info.channel.name + '.' + packet.info.packet.name, 'peer_num:', peer_num, buffer);
	var enet_sendPacket = enet.sendPacket(peer_num, buffer, packet.info.channel.id);

	console.debug('enet_sendPacket:', enet_sendPacket);
	return enet_sendPacket;
}

function logPackets(q){
	return;
	var p = {
		Time: performance.now(),
		Channel: q.channel,
		BytesHex: q.buffer.toString('hex').match(/../g).join('-'),
	};
	//console.log('recv:' + p.BytesHex);
	fs.appendFileSync('../LeagueEmulatorJS_replays/lejs.json', JSON.stringify(p) + ",\n");
}

module.exports = {createPacket, sendPacket, logPackets};
