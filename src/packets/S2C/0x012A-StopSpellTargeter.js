const ExtendedPacket = require('../ExtendedPacket');


module.exports = class StopSpellTargeter extends ExtendedPacket {
	static struct = {
		slot: 'uint32',
	}
};
