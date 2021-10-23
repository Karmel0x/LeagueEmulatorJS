var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.
	struct = {
		ContextualEmoteID: 'uint8',
		HashedParam: 'uint32',
		ContextualEmoteFlags: 'uint8',
	}
};
