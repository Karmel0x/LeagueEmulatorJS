const BasePacket = require('../BasePacket');

module.exports = class UpdateGoldRedirectTarget extends BasePacket {
	static struct = {
		targetNetId: 'uint32',
	}
};
