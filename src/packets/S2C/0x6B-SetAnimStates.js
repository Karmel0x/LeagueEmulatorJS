import BasePacket from '../BasePacket.js';

const AnimationOverrides = {
	fromAnim: 'string',
	toAnim: 'string',
};

export default class SetAnimStates extends BasePacket {
	static struct = {
		count: 'uint8',
	};
	reader(buffer) {
		super.reader(buffer);

		this.entries = buffer.read([AnimationOverrides, this.count]);
	}
	writer(buffer) {
		//if(!this.animationOverrides || !this.animationOverrides.length || this.animationOverrides.length > 0xFF)
		//	return;

		this.count = this.animationOverrides.length;

		super.writer(buffer);

		buffer.write([AnimationOverrides, this.count], this.animationOverrides);
	}
}
