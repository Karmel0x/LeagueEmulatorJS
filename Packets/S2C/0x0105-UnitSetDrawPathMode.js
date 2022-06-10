var ExtendedPacket = require('../ExtendedPacket');


module.exports = class UnitSetDrawPathMode extends ExtendedPacket {
	static struct = {
		targetNetId: 'uint32',
		drawPathMode: 'uint8',
		updateRate: 'float',
	}
};
