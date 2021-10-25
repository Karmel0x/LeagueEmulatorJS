var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.
	struct = {
		SoundName: ['char', 1024],
		OwnerNetID: 'uint32',
	}
};
