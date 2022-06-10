const BasePacket = require('../BasePacket');


module.exports = class ForceDead extends BasePacket {
	static struct = {
		deathDuration: 'float',
	}
};
