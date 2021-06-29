var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//S2C.
	struct = {
		IsFadingIn: 'uint8',
		FadeTime: 'float',
		TeamID: 'uint32',
		Color: 'uint32',
		MaxWeight: 'float',
	}
};
