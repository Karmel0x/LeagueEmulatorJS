var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.
	struct = {
		FolderName: 'string0',
		EventID: 'string0',
		AudioCallbackType: 'uint8',
		AudioVOEventType: 'uint8',
		AudioEventNetID: 'uint32',
	}
};
