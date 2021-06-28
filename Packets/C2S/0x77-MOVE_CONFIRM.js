var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//C2S.MOVE_CONFIRM
	struct = {
		SyncID: 'int32',
		TeleportCount: 'uint8',
	}
};
