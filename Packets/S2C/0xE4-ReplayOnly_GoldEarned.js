var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.REMOVE_ITEM
	struct = {
		OwnerID: 'uint32',
		Amount: 'float',
	}
};
