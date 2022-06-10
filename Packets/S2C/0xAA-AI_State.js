const BasePacket = require('../BasePacket');

module.exports = class AI_State extends BasePacket {
	static struct = {
		AIState: 'uint32',
	}
};
