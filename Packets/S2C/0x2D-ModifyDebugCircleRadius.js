const BasePacket = require('../BasePacket');

module.exports = class ModifyDebugCircleRadius extends BasePacket {
	static struct = {
		objectId: 'int32',
		radius: 'float',
	}
};
