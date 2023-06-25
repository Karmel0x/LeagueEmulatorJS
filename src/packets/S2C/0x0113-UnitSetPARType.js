const ExtendedPacket = require('../ExtendedPacket');


module.exports = class UnitSetPARType extends ExtendedPacket {
	static struct = {
		parType: 'uint8',
	}
};
