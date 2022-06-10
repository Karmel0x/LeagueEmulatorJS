const BasePacket = require('../BasePacket');

module.exports = class ShowAuxiliaryText extends BasePacket {
	static struct = {
		messageId: 'string0',//128
	}
};
