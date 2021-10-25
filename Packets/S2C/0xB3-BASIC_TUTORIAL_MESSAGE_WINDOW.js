var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.
	struct = {
		MessageboxID: 'string0',//128
	}
};
