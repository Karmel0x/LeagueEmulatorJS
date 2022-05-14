var ExtendedPacket = require('../ExtendedPacket');


module.exports = class extends ExtendedPacket {//S2C.
	struct = {
		OwnerNetId: 'uint32',
		MultiKillCount: 'uint8',
	}
};
