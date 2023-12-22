import BasePacket from '../BasePacket';


export default class LineMissileHitList extends BasePacket {
	static struct = {
		targets_length: 'int16',
	};
	reader(buffer) {
		super.reader(buffer);

		this.targets = buffer.read(['uint32', this.targets_length]);
	}
	writer(buffer) {
		if (!this.targets || !this.targets.length || this.targets.length > 0x7FFF)
			return;

		this.targets_length = this.targets.length;

		super.writer(buffer);

		buffer.write(['uint32', this.targets_length], this.targets);
	}
}
