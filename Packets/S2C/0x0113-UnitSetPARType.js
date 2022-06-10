var ExtendedPacket = require('../ExtendedPacket');


module.exports = class UnitSetPARType extends ExtendedPacket {
	static struct = {
		PARType: 'uint8',
	}
};
