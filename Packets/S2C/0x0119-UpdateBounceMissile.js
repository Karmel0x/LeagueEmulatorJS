var ExtendedPacket = require('../ExtendedPacket');
var SVector3 = require('../SharedStruct/SVector3');

module.exports = class UpdateBounceMissile extends ExtendedPacket {
	static struct = {
		targetNetId: 'uint32',
		casterPosition: SVector3,
	}
};
