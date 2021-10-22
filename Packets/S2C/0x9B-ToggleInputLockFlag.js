var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.
	struct = {
		InputLockFlags: 'uint32',
	}
};
