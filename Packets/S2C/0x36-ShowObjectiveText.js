const BasePacket = require('../BasePacket');

module.exports = class ShowObjectiveText extends BasePacket {
	static struct = {
		message: 'string0',//128
	}
};
