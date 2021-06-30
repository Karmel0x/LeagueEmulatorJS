var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//C2S.
	struct = {
		ClientID: 'uint8',
		Delayed: 'uint8',
	}
};
