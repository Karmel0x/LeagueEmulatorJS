const BasePacket = require('../BasePacket');

module.exports = class HandleUIHighlight extends BasePacket {
	static struct = {
		uiHighlightCommand: 'uint8',
		uiElement: 'uint8',
	}
};
