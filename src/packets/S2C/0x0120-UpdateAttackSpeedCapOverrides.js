const ExtendedPacket = require('../ExtendedPacket');


module.exports = class UpdateAttackSpeedCapOverrides extends ExtendedPacket {
	static struct = {
		bitfield: ['bitfield', {
			doOverrideMax: 1,
			doOverrideMin: 2,
		}],
		maxAttackSpeedOverride: 'float',
		minAttackSpeedOverride: 'float',
	}
};
