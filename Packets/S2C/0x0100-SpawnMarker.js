var ExtendedPacket = require('../ExtendedPacket');
const Vector3 = require('../SharedStruct/Vector3');


module.exports = class extends ExtendedPacket {//S2C.
	struct = {
		NetId: 'uint32',
		NetNodeID: 'uint8',
		position: Vector3,
		VisibilitySize: 'float',
	}
};
