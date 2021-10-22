var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.
	struct = {
		ObjectID: 'int32',
		bitfield_unk: 'uint8',
	}
};
