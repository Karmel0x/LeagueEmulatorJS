const BasePacket = require('../BasePacket');


module.exports = class ModifyShield extends BasePacket {
	static struct = {
		bitfield: ['bitfield', {
			physical: 1,
			magical: 2,
			stopShieldFade: 4,
		}],
		amount: 'float',
	}
};
