
const enet = require('./enet');
const Packets = require("./Packets");
require("./BufferExtend");
const BasePacket = require('../Packets/BasePacket');


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

	/**
	 * Create packet instance to pass to sendPacket
	 * @param {String} packetName 
	 * @param {String} channel (S2C/C2S/...)
	 * @returns {BasePacket}
	 */
	static createPacket(packetName, channel = 'S2C'){
		if(typeof Packets[channel] === 'undefined' || typeof Packets[channel][packetName] === 'undefined'){
			console.log('packet is not yet implemented', channel, packetName);
			return {};
		}

		var packet = new Packets[channel][packetName]();
		packet.cmd = Packets[channel][packetName].id;

		return packet;
	}

	static sendPacketS(peer_num, channel, buffer){
		//console.log('sendPacketS', peer_num, buffer, channel);
		enet.sendPacket(peer_num, buffer, channel);
	}
	static sendPacketM(peer_nums, packet){
		PacketUtilities.logPackets(packet);
		console.debug('peer:', peer_nums, 'sent:', packet.channelName + '.' + packet.name);
		//console.debug(packet, packet.buffer);

		peer_nums.forEach((peer_num) => {
			PacketUtilities.sendPacketS(peer_num, packet.channel, packet.buffer);
		});
	}
	/**
	 * 
	 * @param {Array.<Number>} peer_nums 
	 * @param {BasePacket} packet 
	 * @returns 
	 */
	static sendPacket(peer_nums, packet){
		if(!packet || !packet.buffer){
			//console.log('packet is not yet implemented', packet.id);
			return;
		}
		PacketUtilities.sendPacketM(peer_nums, packet);
	}
	static sendPacketP(players, packet){
		var peer_nums = [];
		players.forEach((player) => {
			if(typeof player.peer_num == 'undefined' || player.peer_num < 0)
				return;

			peer_nums.push(player.peer_num);
		});

		PacketUtilities.sendPacket(peer_nums, packet);
	}

	static logPackets(packet){
		global.Logging.packet({
			channel: packet.channel || 0,
			//peer_num: packet.peer_num,
			bytes: packet.buffer.toString('hex'),
			time: Math.round(performance.now()),
			packet: packet.packet || packet,
		});
	}
}

module.exports = PacketUtilities;
