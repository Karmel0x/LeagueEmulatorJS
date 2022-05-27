var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//S2C.
	struct = {
		level: 'uint8',
		AveliablePoints: 'uint8',
	}
};
