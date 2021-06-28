var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//C2S.SYNCH_VERSION
	struct = {
		ClientID: 'int32',
		version: ['char', 256],
	}
};
