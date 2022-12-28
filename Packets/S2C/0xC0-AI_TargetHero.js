const BasePacket = require('../BasePacket');


/**
 * shows sign above source unit health bar
 */
module.exports = class AI_TargetHero extends BasePacket {
	static struct = {
		targetNetId: 'uint32',
	}
};
