var BasePacket = require('../BasePacket');
const Vector3 = require('../SharedStruct/Vector3');

module.exports = class extends BasePacket {//S2C.
	struct = {
		TargetNetId: 'uint32',
		DrawPathNodeType: 'uint8',
		Point: Vector3,
	}
};
