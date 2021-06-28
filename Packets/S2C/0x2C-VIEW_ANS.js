var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.VIEW_ANS
	struct = {
		SyncID: 'uint8',
	}
};
