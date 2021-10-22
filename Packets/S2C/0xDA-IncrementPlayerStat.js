var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.
	struct = {
		PlayerNetID: 'uint32',
		StatEvent: 'uint8',
	}
};
