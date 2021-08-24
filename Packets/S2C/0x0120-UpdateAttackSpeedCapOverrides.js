var ExtendedPacket = require('../ExtendedPacket');


module.exports = class extends ExtendedPacket {//S2C.
	struct = {
		bitfield: ['bitfield', {
			DoOverrideMax: 1,
			DoOverrideMin: 2,
		}],
		MaxAttackSpeedOverride: 'float',
		MinAttackSpeedOverride: 'float',
	}
};
