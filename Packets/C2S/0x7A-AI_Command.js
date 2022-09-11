const BasePacket = require('../BasePacket');

module.exports = class AI_Command extends BasePacket {
	static struct = {
		command: 'string0',//128
	}
};
