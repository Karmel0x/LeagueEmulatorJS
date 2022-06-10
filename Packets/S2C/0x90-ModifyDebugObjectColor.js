const BasePacket = require('../BasePacket');

module.exports = class ModifyDebugObjectColor extends BasePacket {
	static struct = {
		objectId: 'int32',
		color: 'uint32',
	}
};
