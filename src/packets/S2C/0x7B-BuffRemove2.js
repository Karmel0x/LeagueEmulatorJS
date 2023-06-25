const BasePacket = require('../BasePacket');


module.exports = class BuffRemove2 extends BasePacket {
	static struct = {
		buffSlot: 'uint8',
		buffNameHash: 'uint32',
		runTimeRemove: 'float',
	}
};
