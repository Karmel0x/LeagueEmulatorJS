var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//S2C.
	struct = {
		State: 'uint8',
		Duration: 'uint16',
	}
};
