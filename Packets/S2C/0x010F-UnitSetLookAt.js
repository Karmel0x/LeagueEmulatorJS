var ExtendedPacket = require('../ExtendedPacket');
var SVector3 = require('../SharedStruct/SVector3');


module.exports = class UnitSetLookAt extends ExtendedPacket {
	static struct = {
		lookAtType: 'uint8',
		targetPosition: SVector3,
		targetNetId: 'uint32',
	}
};
