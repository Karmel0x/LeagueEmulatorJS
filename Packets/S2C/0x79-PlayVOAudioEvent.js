var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.
	struct = {
		FolderName: ['char', 64],
		EventID: ['char', 64],
		AudioCallbackType: 'uint8',
		AudioVOEventType: 'uint8',
		AudioEventNetId: 'uint32',
	}
};
