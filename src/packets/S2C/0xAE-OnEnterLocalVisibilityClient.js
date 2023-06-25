const BasePacket = require('../BasePacket');


/**
 * SET_HEALTH
 */
module.exports = class OnEnterLocalVisibilityClient extends BasePacket {
	static struct = {

	}
	//todo: check what packets is
	reader(buffer) {
		super.reader(buffer);

		this.packets = [];

		let totalSize = buffer.read1('uint16');// & 0x1FFF
		for (; totalSize > 0;) {
			let packetSize = buffer.read1('uint16');
			totalSize -= 2;

			let packetData = buffer.readobj(['uint8', packetSize]);
			totalSize -= packetSize;

			this.packets.push(packetData);
		}

		if (buffer.off >= buffer.length)
			return;

		this.health = buffer.read1('float');
		this.currentHealth = buffer.read1('float');
	}
	writer(buffer) {
		super.writer(buffer);

		this.packets = this.packets || [];
		let totalSize = 0;
		for (let i = 0; this.packets.length < i; i++) {
			totalSize += 2;

			let packetSize = this.packets[i].length;
			totalSize += packetSize;
		}
		buffer.write1('uint16', totalSize);// & 0x1FFF

		for (let i = 0; this.packets.length < i; i++) {
			let packetSize = this.packets[i].length;
			buffer.write1('uint16', packetSize);

			buffer.writeobj(['uint8', packetSize], this.packets[i]);
		}

		if (!this.health)
			return;

		buffer.writeobj({
			health: 'float',
			currentHealth: 'float',
		}, this);
	}
};
