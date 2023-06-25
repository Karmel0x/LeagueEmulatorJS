const BasePacket = require('../BasePacket');

module.exports = class Connected extends BasePacket {
	static struct = {
		clientId: 'int32',
	}
};
