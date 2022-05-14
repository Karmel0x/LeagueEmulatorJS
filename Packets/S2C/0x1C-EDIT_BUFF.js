var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//S2C.
	struct = {
		BuffSlot: 'uint8',
		Count: 'uint8',
		Duration: 'float',
		RunningTime: 'float',
		CasterNetId: 'uint32',
	}
};
