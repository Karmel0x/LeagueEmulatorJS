const BasePacket = require('../BasePacket');

module.exports = class SetFrequency extends BasePacket {
	static struct = {
		newFrequency: 'float',
	}
};
