const BasePacket = require('../BasePacket');


module.exports = class OnTipEvent extends BasePacket {
	static struct = {
		tipCommand: 'uint8',
		tipId: 'uint32',
	}
};
