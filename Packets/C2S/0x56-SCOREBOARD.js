var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//C2S.SCOREBOARD
	struct = {
		unk1: ['uint8', 16],
		unk2: 'uint32',//SyncID?
	}
};
