var BasePacket = require('./BasePacket');
const Packets = require("../Packets");
var Types = require('../Constants/Types');

function getInt32Bytes_reversed(x){
	var bytes = [];
	for(var i = 4; i > 0; --i){
		bytes.push(x & 255);
		x = x >> 8;
	}
	return bytes;
}

module.exports = class {//S2C.BATCH
	reader(buffer){
		this.cmd = buffer.read1('uint8');
		this.packets_length = buffer.read1('uint8');
		this.packets = [];

		//if(this.packets_length < 1 || buffer.size < 3)
			return;

	   // console.log('buffer', buffer);
		let packet = {};
		for(let i = 0; i < this.packets_length; i++){
			let bitfield = i ? buffer.read1('uint8') : 0;
			
			packet = {
				packetSize: !i || ((bitfield >> 2) == 63) ? buffer.read1('uint8') - !i * 5 : (bitfield >> 2),
				cmd: ((bitfield & 1) == 0) ? buffer.read1('uint8') : packet.cmd,
				netId: ((bitfield & 2) == 0) ? buffer.read1('int32') : packet.netId + buffer.read1('int8'),
			};

			let packetData = buffer.readobj(['uint8', packet.packetSize])
			//console.log(bitfield, packet, packetData);
			let packet2 = {
				cmd: packet.cmd || 0,
				buffer: Buffer.from([packet.cmd].concat(getInt32Bytes_reversed(packet.netId), packetData))
			};
			this.packets.push(packet2);
		}
	}
	writer(buffer){//need check
		this.cmd = 0xFF;
		buffer.write1('uint8', this.cmd);
		buffer.write1('uint8', this.packets.length);

		if(this.packets.length < 1)
			return;

		//console.log('buffer', buffer);
		let packet = {};
		for(let i = 0; i < this.packets.length; i++){
			let bitfield = 0;
			let has = {
				packetSize: !i,
				cmd: !i,
				netId: !i,
			};
			if(i){
				has.packetSize = this.packets[i].buffer.length >= 63;
				if(has.packetSize)
					bitfield |= 63 << 2;
				else
					bitfield |= this.packets[i].buffer.length << 2;

				has.cmd = this.packets[i].cmd != this.packets[i - 1].cmd;
				if(has.cmd)
					bitfield |= 1;

				let netIdDiff = this.packets[i].netId - this.packets[i - 1].netId;
				has.netId = netIdDiff > Types.maxValues.int8 || netIdDiff < Types.minValues.int8;
				if(has.netId)
					bitfield |= 2;

				buffer.write1('uint8', bitfield);
			}
			
			if(has.packetSize)
				buffer.write1('uint8', this.packets[i].buffer.length + !i * 5);

			if(has.cmd)
				buffer.write1('uint8', this.packets[i].cmd);

			if(has.netId)
				buffer.write1('int32', this.packets[i].netId);
			else
				buffer.write1('int8', this.packets[i].netId - this.packets[i - 1].netId);

			buffer = Buffer.concat([buffer, this.packets[i].buffer.slice(5)]);
		}
	}
};
