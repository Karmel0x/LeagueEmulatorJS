var BasePacket = require('../BasePacket');
const Vector3 = require('../SharedStruct/Vector3');

module.exports = class extends BasePacket {//S2C.
	struct = {
		Position: Vector3,
		Forward: Vector3,
		SyncID: 'int32',
	}
};
