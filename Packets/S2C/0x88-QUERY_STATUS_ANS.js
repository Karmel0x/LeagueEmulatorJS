var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.QUERY_STATUS_ANS
	struct = {
		Response: 'uint8',
	}
};
