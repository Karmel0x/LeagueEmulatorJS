var ExtendedPacket = require('../ExtendedPacket');


module.exports = class StartSpellTargeter extends ExtendedPacket {
	static struct = {
		slot: 'uint32',
		targetTime: 'float',
	}
};
