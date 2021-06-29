var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//S2C.
	struct = {
		BuffSlot: 'uint8',
		BuffNameHash: 'uint32',
		RunTimeRemove: 'float',
	}
};
