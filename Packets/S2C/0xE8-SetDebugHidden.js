var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.
	struct = {
		ObjectID: 'int32',
		bitfield_Unknown: 'uint8',
	}
};
