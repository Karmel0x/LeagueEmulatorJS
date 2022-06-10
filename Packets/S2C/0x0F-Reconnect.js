const BasePacket = require('../BasePacket');

module.exports = class Reconnect extends BasePacket {
	static struct = {
		clientId: 'int32',
	}
};
