var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.
	struct = {
		SoundName: 'string0',
		OwnerNetID: 'uint32',
	}
};
