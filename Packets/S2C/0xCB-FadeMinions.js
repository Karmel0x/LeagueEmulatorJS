var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//S2C.
	struct = {
		TeamID: 'uint8',
		FadeAmount: 'float',
		FadeTime: 'float',
	}
};
