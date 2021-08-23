var BasePacket = require('../BasePacket');

var AnimationOverrides = {
    fromAnim: 'string',
    toAnim: 'string',
};

module.exports = class extends BasePacket {//S2C.
	struct = {
		count: 'uint8',
        AnimationOverrides: [AnimationOverrides, 'count'],
	}
	writer(buffer){
		this.count = this.count || this.AnimationOverrides.length;
		super.writer(buffer);
	}
};
