const BasePacket = require('../BasePacket');


module.exports = class StopAnimation extends BasePacket {
	static struct = {
		bitfield: ['bitfield', {
			fade: 1,
			ignoreLock: 2,
			stopAll: 4,
		}],
		animationName: 'string0',//64
	}
};
