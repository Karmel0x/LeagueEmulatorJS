var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.ADD_XP
	struct = {
		TargetNetId: 'uint32',
		ExpAmount: 'float',
	}
};
