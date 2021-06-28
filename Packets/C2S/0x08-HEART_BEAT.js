var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//C2S.HEART_BEAT
	struct = {
		unk1: 'uint32',
		unk2: 'uint32',
	}
};
