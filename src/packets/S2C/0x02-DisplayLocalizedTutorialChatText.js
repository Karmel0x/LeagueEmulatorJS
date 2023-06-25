const BasePacket = require('../BasePacket');


/**
 * orange chat message
 */
module.exports = class DisplayLocalizedTutorialChatText extends BasePacket {
	static struct = {
		message: 'string0',//128
	}
};
