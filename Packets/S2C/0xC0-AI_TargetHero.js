const BasePacket = require('../BasePacket');


module.exports = class AI_TargetHero extends BasePacket {
	static struct = {
		targetNetId: 'uint32',
	}
};
