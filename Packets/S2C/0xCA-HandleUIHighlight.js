const BasePacket = require('../BasePacket');

module.exports = class HandleUIHighlight extends BasePacket {
	static struct = {
		UIHighlightCommand: 'uint8',
		UIElement: 'uint8',
	}
};
