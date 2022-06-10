const BasePacket = require('../BasePacket');

module.exports = class RemoveDebugObject extends BasePacket {
	static struct = {
		objectId: 'int32',
	}
};
