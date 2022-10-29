const BasePacket = require('../BasePacket');


/**
 * setting speed of the game
 * may be used to fast forward game
 */
module.exports = class SetFrequency extends BasePacket {
	static struct = {
		newFrequency: 'float',
	}
};
