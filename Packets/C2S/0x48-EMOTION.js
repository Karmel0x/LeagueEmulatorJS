var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//C2S.EMOTION
	struct = {
		EmoteID: 'uint8',
	}
};
