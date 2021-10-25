var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//S2C.
	struct = {
		bitfield: ['bitfield', {
			Fade: 1,
			IgnoreLock: 2,
			StopAll: 4,
		}],
		AnimationName: 'string0',//64
	}
};
