var ExtendedPacket = require('../ExtendedPacket');


module.exports = class extends ExtendedPacket {//S2C.
	struct = {
		AscendedNetId: 'uint32',
	}
};
