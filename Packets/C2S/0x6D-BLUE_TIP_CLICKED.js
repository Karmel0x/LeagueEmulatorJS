var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//C2S.
	struct = {
		TipCommand: 'uint8',
		TipID: 'uint32',
	}
};
