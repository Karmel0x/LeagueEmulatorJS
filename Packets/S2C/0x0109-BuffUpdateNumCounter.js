var ExtendedPacket = require('../ExtendedPacket');


module.exports = class extends ExtendedPacket {//S2C.
	struct = {
		BuffSlot: 'uint8',
		Counter: 'int32',
	}
};
