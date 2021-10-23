var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.
	struct = {
		OwnerID: 'uint32',
		Amount: 'float',
	}
};
