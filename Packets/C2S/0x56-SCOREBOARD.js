var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//C2S.SCOREBOARD
	struct = {
		Unknown: ['uint8', 16],
		Unknown2: 'uint32',//SyncID?
	}
};
