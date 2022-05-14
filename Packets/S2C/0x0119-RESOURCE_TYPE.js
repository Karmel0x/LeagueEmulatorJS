var ExtendedPacket = require('../ExtendedPacket');
var Vector3 = require('../SharedStruct/Vector3');

module.exports = class extends ExtendedPacket {//S2C.
	struct = {
		TargetNetId: 'uint32',
		CasterPosition: Vector3,
	}
};
