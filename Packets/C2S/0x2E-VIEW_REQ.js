var Vector3 = require('../SharedStruct/Vector3');

module.exports = {//C2S.VIEW_REQ
	cmd: 'uint8',
	netId: 'uint32',

	CameraPosition: Vector3,
	CameraDirection: Vector3,
	ClientID: 'int32',
	SyncID: 'uint8',
};
