
const enet = require('../../enetcppjs/build/Release/enetcppjs.node');
const Packets = require("./Packets");
require("./BufferExtend");
const fs = require("fs");


class PacketUtilities {
	/*static packetSize(packet, source = false){

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
	static createPacket(packetName, channel = 'S2C'){
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

	static createBuffer(packet){
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

		return buffer;
	}

	static sendPacketS(peer_num, channel, buffer){
		enet.sendPacket(peer_num, buffer, channel);
	}
	static sendPacketM(peer_nums, packet, buffer){
		PacketUtilities.logPackets({channel: packet.info.channel.id, buffer, packet});
		console.debug('peer:', peer_nums, 'sent:', packet.info.channel.name + '.' + packet.info.packet.name);

		peer_nums.forEach((peer_num) => {
			var channel = packet.info.channel.id;
			PacketUtilities.sendPacketS(peer_num, channel, buffer);
		});
	}
	static sendPacket(peer_nums, packet){
		if(typeof packet === 'undefined'){
			//console.log('packet is not yet implemented', packet.id);
			return;
		}
		var buffer = PacketUtilities.createBuffer(packet);
		PacketUtilities.sendPacketM(peer_nums, packet, buffer);
	}
	//static sendPacketP(players, packet){
	//	var buffer = PacketUtilities.createBuffer(packet);
	//
	//	players.forEach((player) => {
	//		if(typeof player.peer_num == 'undefined'){
	//			//player.storePacket({channel: packet.info.channel.id, buffer: Buffer.from(buffer)});
	//			return;
	//		}
	//
	//		PacketUtilities.sendPacketS(player.peer_num, packet.info.channel.id, buffer);
	//	});
	//}
	static sendPacketP(players, packet){
		var peer_nums = [];
		players.forEach((player) => {
			if(typeof player.peer_num == 'undefined')
				return;

			peer_nums.push(player.peer_num);
		});

		PacketUtilities.sendPacket(peer_nums, packet);
	}

	static logPackets(q){
		global.Logging.packet({
			channel: q.channel || 0,
			//peer_num: q.peer_num,
			bytes: q.buffer.toString('hex'),
			time: Math.round(performance.now()),
			packet: q.packet,
		});
	}
}

module.exports = PacketUtilities;
