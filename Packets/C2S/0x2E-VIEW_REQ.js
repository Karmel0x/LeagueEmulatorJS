var BasePacket = require('../BasePacket');
var Vector3 = require('../SharedStruct/Vector3');

module.exports = class extends BasePacket {//C2S.VIEW_REQ
	struct = {
		CameraPosition: Vector3,
		CameraDirection: Vector3,
		ClientID: 'int32',
		SyncID: 'uint8',
	}
};
