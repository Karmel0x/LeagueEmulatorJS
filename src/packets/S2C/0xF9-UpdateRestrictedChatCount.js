const BasePacket = require('../BasePacket');

module.exports = class UpdateRestrictedChatCount extends BasePacket {
	static struct = {
		count: 'int32',
	}
};
