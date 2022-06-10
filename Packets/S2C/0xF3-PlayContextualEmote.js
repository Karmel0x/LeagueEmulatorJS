const BasePacket = require('../BasePacket');

module.exports = class PlayContextualEmote extends BasePacket {
	static struct = {
		contextualEmoteId: 'uint8',
		hashedParam: 'uint32',
		contextualEmoteFlags: 'uint8',
	}
};
