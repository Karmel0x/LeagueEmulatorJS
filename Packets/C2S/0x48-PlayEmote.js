const BasePacket = require('../BasePacket');

module.exports = class PlayEmote extends BasePacket {
	static struct = {
		emoteId: 'uint8',
	}
};
