var BasePacket = require('../BasePacket');

const TeleportData = {
	TeleportNetID: 'uint32',
	TeleportID: 'uint8',
};

module.exports = class extends BasePacket {//C2S.MOVE_CONFIRM
	struct = {
		SyncID: 'int32',
		TeleportCount: 'uint8',
		Teleport: [TeleportData, 'TeleportCount']
	}
};
