var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//S2C.
	struct = {

	}
	//todo: check what Packets is
	reader(buffer){
		super.reader(buffer);

		this.Packets = [];

		let totalSize = buffer.read1('uint16');// & 0x1FFF
		for(; totalSize > 0;){
			let packetSize = buffer.read1('uint16');
			totalSize -= 2;

			let packetData = buffer.readobj(['uint8', packetSize]);
			totalSize -= packetSize;

			this.Packets.push(packetData);
		}

		if(buffer.off >= buffer.length)
			return;

		this.MaxHealth = buffer.read1('float');
		this.Health = buffer.read1('float');
	}
	writer(buffer){
		super.writer(buffer);
		
		this.Packets = this.Packets || [];
		let totalSize = 0;
		for(let i = 0; this.Packets.length < i; i++){
			totalSize += 2;

			let packetSize = this.Packets[i].length;
			totalSize += packetSize;
		}
		buffer.write1('uint16', totalSize);// & 0x1FFF

		for(let i = 0; this.Packets.length < i; i++){
			let packetSize = this.Packets[i].length;
			buffer.write1('uint16', packetSize);

			buffer.writeobj(['uint8', packetSize], this.Packets[i]);
		}

		if(!this.MaxHealth)
			return;
			
		buffer.writeobj({
			MaxHealth: 'float',
			Health: 'float',
		}, this);
	}
};
