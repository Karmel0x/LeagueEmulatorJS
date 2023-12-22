import BasePacket from '../BasePacket';


/**
 * SET_HEALTH
 */
export default class OnEnterLocalVisibilityClient extends BasePacket {
	static struct = {

	};
	//todo: check what packets is
	reader(buffer) {
		super.reader(buffer);

		this.packets = [];

		let totalSize = buffer.read('uint16');// & 0x1FFF
		for (; totalSize > 0;) {
			let packetSize = buffer.read('uint16');
			totalSize -= 2;

			let packetData = buffer.read(['uint8', packetSize]);
			totalSize -= packetSize;

			this.packets.push(packetData);
		}

		if (buffer.offset >= buffer.length)
			return;

		this.health = buffer.read('float');
		this.currentHealth = buffer.read('float');
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
		buffer.write('uint16', totalSize);// & 0x1FFF

		for (let i = 0; this.packets.length < i; i++) {
			let packetSize = this.packets[i].length;
			buffer.write('uint16', packetSize);

			buffer.write(['uint8', packetSize], this.packets[i]);
		}

		if (!this.health)
			return;

		buffer.write({
			health: 'float',
			currentHealth: 'float',
		}, this);
	}
}
