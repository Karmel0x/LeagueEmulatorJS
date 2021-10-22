var ExtendedPacket = require('../ExtendedPacket');


module.exports = class extends ExtendedPacket {//S2C.
	struct = {
		TargetNetID: 'uint32',
		DrawPathMode: 'uint8',
		UpdateRate: 'float',
	}
};
