var BasePacket = require('../BasePacket');


module.exports = class extends BasePacket {//S2C.
	struct = {
		bitfield: ['bitfield', {
			Physical: 1,
			Magical: 2,
			StopShieldFade: 4,
		}],
		Amount: 'float',
	}
};
