const ExtendedPacket = require('../ExtendedPacket');
const SVector3 = require('../sharedstruct/SVector3');

module.exports = class UpdateBounceMissile extends ExtendedPacket {
	static struct = {
		targetNetId: 'uint32',
		casterPosition: SVector3,
	}
};
