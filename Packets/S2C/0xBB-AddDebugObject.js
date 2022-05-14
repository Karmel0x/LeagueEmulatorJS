var BasePacket = require('../BasePacket');
const Vector3 = require('../SharedStruct/Vector3');

module.exports = class extends BasePacket {//S2C.
	struct = {
		DebugID: 'int32',
		Lifetime: 'float',
		Type: 'uint8',
		NetId1: 'uint32',
		NetId2: 'uint32',
		Radius: 'float',
		Point1: Vector3,
		Point2: Vector3,
		Color: 'uint32',
		MaxSize: 'uint32',
		bitfield_Unknown: 'uint8',
		StringBuffer: 'string0',//128
	}
};
