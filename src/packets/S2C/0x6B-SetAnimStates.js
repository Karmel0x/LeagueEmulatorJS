const BasePacket = require('../BasePacket');

const AnimationOverrides = {
	fromAnim: 'string',
	toAnim: 'string',
};

module.exports = class SetAnimStates extends BasePacket {
	static struct = {
		count: 'uint8',
	}
	reader(buffer) {
		super.reader(buffer);

		this.entries = buffer.readobj([AnimationOverrides, this.count]);
	}
	writer(buffer) {
		//if(!this.animationOverrides || !this.animationOverrides.length || this.animationOverrides.length > 0xFF)
		//	return;

		this.count = this.animationOverrides.length;

		super.writer(buffer);

		buffer.writeobj([AnimationOverrides, this.count], this.animationOverrides);
	}
};
