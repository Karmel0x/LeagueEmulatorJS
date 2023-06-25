const BasePacket = require('../BasePacket');


/**
 * text in border on middle of the screen
 * to hide it use HideObjectiveText
 */
module.exports = class ShowObjectiveText extends BasePacket {
	static struct = {
		messageId: 'string0',//128
	}
};
