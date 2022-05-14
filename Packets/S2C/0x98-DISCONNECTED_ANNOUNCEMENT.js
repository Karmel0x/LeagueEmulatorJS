var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//S2C.
	struct = {
		NetId: 'uint32',
		bitfield_Unknown: 'uint8',
	}
};
