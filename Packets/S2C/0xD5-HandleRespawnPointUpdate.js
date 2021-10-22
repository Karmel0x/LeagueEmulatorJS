var BasePacket = require('../BasePacket');
const Vector3 = require('../SharedStruct/Vector3');

module.exports = class extends BasePacket {//S2C.
	struct = {
		RespawnPointCommand: 'uint8',
		RespawnPointUIID: 'uint8',
		TeamID: 'uint32',
		ClientID: 'int32',
		Position: Vector3,
	}
};
