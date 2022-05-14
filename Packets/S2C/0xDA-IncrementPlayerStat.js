var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.
	struct = {
		PlayerNetId: 'uint32',
		StatEvent: 'uint8',
	}
};
