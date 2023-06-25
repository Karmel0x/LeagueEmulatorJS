const BasePacket = require('../BasePacket');

module.exports = class RefreshAuxiliaryText extends BasePacket {
	static struct = {
		messageId: 'string0',//128
	}
};
