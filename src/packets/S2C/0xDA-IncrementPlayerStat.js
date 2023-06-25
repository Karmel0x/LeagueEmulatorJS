const BasePacket = require('../BasePacket');

module.exports = class IncrementPlayerStat extends BasePacket {
	static struct = {
		playerNetId: 'uint32',
		statEvent: 'uint8',
	}
};
