var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//S2C.
	struct = {
		BuffSlot: 'uint8',
		RunningTime: 'float',
		Duration: 'float',
		CasterNetID: 'uint32',
	}
};
