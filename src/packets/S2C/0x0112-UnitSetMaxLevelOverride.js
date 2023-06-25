const ExtendedPacket = require('../ExtendedPacket');


module.exports = class UnitSetMaxLevelOverride extends ExtendedPacket {
	static struct = {
		maxLevelOverride: 'uint8',
	}
};
