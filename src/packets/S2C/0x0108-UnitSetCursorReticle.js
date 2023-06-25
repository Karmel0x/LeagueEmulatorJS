const ExtendedPacket = require('../ExtendedPacket');


module.exports = class UnitSetCursorReticle extends ExtendedPacket {
	static struct = {
		radius: 'float',
		secondaryRadius: 'float',
	}
};
