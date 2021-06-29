var BasePacket = require('../BasePacket');
var Vector3 = require('../SharedStruct/Vector3');

module.exports = class extends BasePacket {//S2C.SetCircularMovementRestriction
	struct = {
		Center: Vector3,
		Radius: 'float',
		RestrictCamera: 'uint8',
	}
};
