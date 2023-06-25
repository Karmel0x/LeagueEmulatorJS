const ExtendedPacket = require('../ExtendedPacket');


module.exports = class ChangeMissileSpeed extends ExtendedPacket {
	static struct = {
		speed: 'float',
		delay: 'float',
	}
};
