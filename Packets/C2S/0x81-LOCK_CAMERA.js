var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//C2S.LOCK_CAMERA
	struct = {
		Locked: 'uint8',
		ClientID: 'int32',
	}
};