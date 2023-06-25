const BasePacket = require('../BasePacket');

module.exports = class ModifyDebugText extends BasePacket {
	static struct = {
		text: 'string',
	}
};
