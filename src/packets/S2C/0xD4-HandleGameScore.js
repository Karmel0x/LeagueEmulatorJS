const BasePacket = require('../BasePacket');

/**
 * Used for dominion game mode
 */
module.exports = class HandleGameScore extends BasePacket {
	static struct = {
		team: 'uint32',
		score: 'int32',
	}
};
