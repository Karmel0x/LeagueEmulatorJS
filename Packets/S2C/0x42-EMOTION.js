var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.EMOTION
	struct = {
		EmoteID: 'uint8',
	}
};
