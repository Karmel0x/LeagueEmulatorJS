var ExtendedPacket = require('../ExtendedPacket');


module.exports = class NeutralMinionTimerUpdate extends ExtendedPacket {
	static struct = {
		typeHash: 'int32',
		expire: 'float',
	}
};
