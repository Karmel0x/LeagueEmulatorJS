const ExtendedPacket = require('../ExtendedPacket');


module.exports = class SetCanSurrender extends ExtendedPacket {
	static struct = {
		bitfield: ['bitfield', {
			canSurrender: 1,
		}],
	}
};
