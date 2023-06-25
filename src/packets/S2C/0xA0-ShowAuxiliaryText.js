const BasePacket = require('../BasePacket');


/**
 * shows text in border on right of the screen
 * to hide it use HideAuxiliaryText
 */
module.exports = class ShowAuxiliaryText extends BasePacket {
	static struct = {
		messageId: 'string0',//128
	}
};
