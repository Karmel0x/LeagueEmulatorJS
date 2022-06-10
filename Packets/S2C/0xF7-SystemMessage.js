const BasePacket = require('../BasePacket');

/**
 * Orange message on chat box
 */
module.exports = class SystemMessage extends BasePacket {
	static struct = {
		sourceNetId: 'uint32',
		message: 'string0',//512
	}
};
