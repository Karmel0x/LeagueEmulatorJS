var ExtendedPacket = require('../ExtendedPacket');
var SVector3 = require('../SharedStruct/SVector3');


module.exports = class UnitSetLookAt extends ExtendedPacket {
	static LookAtType = {
		Direction: 0,
		Location: 1,
		Unit: 2,
	};

	static struct = {
		lookAtType: 'uint8',
		targetPosition: SVector3,
		targetNetId: 'uint32',
	}
};
