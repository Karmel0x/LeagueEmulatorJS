const BasePacket = require('../BasePacket');


module.exports = class DisplayLocalizedTutorialChatText extends BasePacket {
	static struct = {
		message: 'string0',//128
	}
};
