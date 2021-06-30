var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//C2S.
	struct = {
		Slot: 'uint8',
		Sell: 'uint8',
	}
};
