var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.
	struct = {
		TeamID: 'uint32',
		Score: 'int32',
	}
};
