var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.
	struct = {
		SourceNetId: 'uint32',
		MusicID: 'uint32',
	}
};
