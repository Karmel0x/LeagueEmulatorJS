const BasePacket = require('../BasePacket');

module.exports = class OpenTutorialPopup extends BasePacket {
	static struct = {
		messageBoxId: 'string0',//128
	}
};
