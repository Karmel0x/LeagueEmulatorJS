const BasePacket = require('../BasePacket');

module.exports = class UnitAddEXP extends BasePacket {
	static struct = {
		targetNetId: 'uint32',
		expAmount: 'float',
	}
};
