const BasePacket = require('../BasePacket');

module.exports = class ServerTick extends BasePacket {
	static struct = {
		delta: 'float',
	}
};
