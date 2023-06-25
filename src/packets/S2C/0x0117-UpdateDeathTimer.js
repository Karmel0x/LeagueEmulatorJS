const ExtendedPacket = require('../ExtendedPacket');


module.exports = class UpdateDeathTimer extends ExtendedPacket {
	static struct = {
		deathDuration: 'float',
	}
};
