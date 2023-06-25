const BasePacket = require('../BasePacket');

/**
 * Used for dominion game mode
 */
module.exports = class HandleGameScore extends BasePacket {
	static struct = {
		teamId: 'uint32',
		score: 'int32',
	}
};
