var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//S2C.
	struct = {
		id: 'uint8',
		source: 'uint32',

		unk1: 'uint8',
	}
};
