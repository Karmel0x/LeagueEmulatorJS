const BasePacket = require('../BasePacket');

module.exports = class AI_TargetSelection extends BasePacket {
	static struct = {
		targetNetIds: ['uint32', 5],
	}
};
