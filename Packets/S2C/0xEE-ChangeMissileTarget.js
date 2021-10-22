var BasePacket = require('../BasePacket');
const Vector3 = require('../SharedStruct/Vector3');

module.exports = class extends BasePacket {//S2C.
	struct = {
		TargetNetID: 'uint32',
		TargetPosition: Vector3,
	}
};
