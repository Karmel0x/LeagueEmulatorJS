//
//import Server from '../app/server';
//import Types from '../constants/Types';
//import BinaryHelper from '../functions/binary-helper';
//import { parsePacket } from '../core/network/parse';
//import PacketReaderWriter from '../core/network/binary-packet-struct';
//
//
//export default class BatchPacket {
//	static channel = 3;//s2c
//
//	static findPacketById(packetId) {
//		for (let channelId in Server.packets) {
//			let channelPackets = Server.packets[channelId];
//			if (channelPackets[packetId])
//				return channelPackets[packetId];
//		}
//		return null;
//	}
//
//	reader(buffer: PacketReaderWriter) {
//		this.cmd = buffer.read('uint8');
//		this.packets_length = buffer.read('uint8');
//		this.parsedPackets = [];
//
//		if (this.packets_length < 1 || buffer.length < 3)
//			return;
//
//		let packets = [];
//
//		let packet = {
//			packetSize: buffer.read('uint8') - 5,
//			cmd: buffer.read('uint8'),
//			netId: buffer.read('uint32'),
//		};
//
//		let packetData = buffer.read(['uint8', packet.packetSize]);
//		//console.log({packet, c: packet.cmd.toString(16), data: Buffer.from(packetData)});
//		let buffer2 = Buffer.from([].concat(packet.cmd, BinaryHelper.getBytes(packet.netId), packetData));
//		packets.push(buffer2);
//
//		for (let i = 1; i < this.packets_length; i++) {
//			let bitfield = buffer.read('uint8');
//			let packetSize = (bitfield >> 2);
//
//			packet = {
//				cmd: ((bitfield & 1) == 0) ? buffer.read('uint8') : packet.cmd,
//				netId: ((bitfield & 2) == 0) ? buffer.read('uint32') : (packet.netId + buffer.read('int8')),
//				packetSize: (packetSize == 63) ? buffer.read('uint8') : packetSize,
//			};
//
//			let packetData = buffer.read(['uint8', packet.packetSize]);
//			//console.log({bitfield, packet, c: packet.cmd.toString(16), b: [(packetSize == 63), ((bitfield & 1) == 0), ((bitfield & 2) != 0)], data: Buffer.from(packetData)});
//			let buffer2 = Buffer.from([].concat(packet.cmd, BinaryHelper.getBytes(packet.netId), packetData));
//			packets.push(buffer2);
//		}
//
//		for (let i in packets) {
//			//// some batched packets are different?
//			//let cmd = packets[i].readUInt8(0);
//			//if(cmd == 0x72) // IssueOrderReq
//			//	continue;
//
//			let parsed = parsePacket({ channel: this.constructor.channel, buffer: packets[i] });
//			parsed.cmdName = this.constructor.findPacketById(parsed.cmd).name;//dev
//			this.parsedPackets.push(parsed);
//		}
//		//console.log(packets, this.parsedPackets);
//	}
//
//	writer(buffer) {
//		this.cmd = 0xFF;
//		buffer.write('uint8', this.cmd);
//		buffer.write('uint8', this.packets.length);
//
//		if (this.packets.length < 1)
//			return;
//
//		this.packets = this.packets.filter((packet, i) => {
//			if (packet.buffer.length > 0xFF) {
//				console.log(`BatchPacket : packet[${i}] size too big[${packet.buffer.length}]`);
//				return false;
//			}
//			return true;
//		});
//
//		// todo: parsedPackets
//
//
//		let packet = {};
//		{
//			packet = {
//				packetSize: this.packets[0].buffer.length,
//				cmd: this.packets[0].buffer.readUint8(0),
//				netId: this.packets[0].buffer.readUint32(1),
//			};
//
//			buffer.write('uint8', packet.packetSize);
//			buffer = Buffer.concat([buffer, this.packets[0].buffer]);
//		}
//		for (let i = 1; i < this.packets.length; i++) {
//
//			let packet2 = {
//				cmd: this.packets[i].buffer.readUint8(0),
//				netId: this.packets[i].buffer.readUint32(1),
//				packetSize: this.packets[i].buffer.length - 5,
//			};
//
//			let bitfield = 0;
//
//			// if cmd has changed
//			if (packet2.cmd != packet.cmd)
//				bitfield |= 1;
//
//			// if difference between netId is more than byte
//			if (Math.abs(packet2.netId - packet.netId) > 0xFF)
//				bitfield |= 2;
//
//			// if buffer length is less than 63 we push (length << 2)
//			if (packet2.packetSize < 63)
//				bitfield |= packet2.packetSize << 2;
//			else
//				bitfield |= 63 << 2;
//
//			buffer.write('uint8', bitfield);
//
//			if ((bitfield & 1) == 0)
//				buffer.write('uint8', packet2.cmd);
//
//			if ((bitfield & 2) == 0)
//				buffer.write('uint32', packet2.netId);
//			else
//				buffer.write('int8', (packet.netId - packet2.netId));
//
//			if ((bitfield >> 2) == 63)
//				buffer.write('uint8', packet2.packetSize);
//
//			buffer = Buffer.concat([buffer, this.packets[i].buffer.slice(5)]);
//		}
//	}
//}
//