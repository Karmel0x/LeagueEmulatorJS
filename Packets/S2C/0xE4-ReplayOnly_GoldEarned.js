const BasePacket = require('../BasePacket');

module.exports = class ReplayOnly_GoldEarned extends BasePacket {
	static struct = {
		ownerId: 'uint32',
		amount: 'float',
	}
};
