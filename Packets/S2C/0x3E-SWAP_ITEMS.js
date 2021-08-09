var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//S2C.SWAP_ITEMS
	struct = {
		Source: 'uint8',
		Destination: 'uint8',
	}
};
