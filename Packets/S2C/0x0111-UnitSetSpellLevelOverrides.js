var ExtendedPacket = require('../ExtendedPacket');


module.exports = class extends ExtendedPacket {//S2C.
	struct = {
		SpellMaxLevels: ['uint8', 4],
		SpellUpgradeLevels: [['uint8', 6], 4],
	}
};
