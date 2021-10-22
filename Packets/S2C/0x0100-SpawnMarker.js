var ExtendedPacket = require('../ExtendedPacket');
const Vector3 = require('../SharedStruct/Vector3');


module.exports = class extends ExtendedPacket {//S2C.
	struct = {
		NetID: 'uint32',
		NetNodeID: 'uint8',
		Position: Vector3,
		VisibilitySize: 'float',
	}
};
