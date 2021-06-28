var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.DEBUG_MESSAGE
	struct = {
		msg: ['char', 512]
	}
};
