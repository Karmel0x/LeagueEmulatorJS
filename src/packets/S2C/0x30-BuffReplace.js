const BasePacket = require('../BasePacket');


module.exports = class BuffReplace extends BasePacket {
	static struct = {
		buffSlot: 'uint8',
		runningTime: 'float',
		duration: 'float',
		casterNetId: 'uint32',
	}
};
