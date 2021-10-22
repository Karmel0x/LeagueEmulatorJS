var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.
	struct = {
		UIHighlightCommand: 'uint8',
		UIElement: 'uint8',
	}
};
