var ExtendedPacket = require('../ExtendedPacket');


module.exports = class extends ExtendedPacket {//S2C.
	struct = {
		NetId: 'uint32',
		CanAutoAttackGroundState: 'uint8',
	}
};
