var ExtendedPacket = require('../ExtendedPacket');


module.exports = class UpdateAscended extends ExtendedPacket {
	static struct = {
		ascendedNetId: 'uint32',
	}
};
