const ExtendedPacket = require('../ExtendedPacket');


module.exports = class BuffUpdateNumCounter extends ExtendedPacket {
	static struct = {
		buffSlot: 'uint8',
		counter: 'int32',
	}
};
