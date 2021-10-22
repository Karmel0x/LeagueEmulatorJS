var ExtendedPacket = require('../ExtendedPacket');


module.exports = class extends ExtendedPacket {//S2C.
	struct = {
		TypeHash: 'int32',
		Expire: 'float',
	}
};
