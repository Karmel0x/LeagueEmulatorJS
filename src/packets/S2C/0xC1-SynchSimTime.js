const BasePacket = require('../BasePacket');

module.exports = class SynchSimTime extends BasePacket {
	static struct = {
		synchTime: 'float',
	}
};
