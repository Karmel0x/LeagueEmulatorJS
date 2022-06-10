const BasePacket = require('../BasePacket');

module.exports = class DisplayFloatingText extends BasePacket {
	static struct = {
		targetNetId: 'uint32',
		floatTextType: 'uint32',
		param: 'int32',
		message: 'string0',//128
	}
};
