var BasePacket = require('../BasePacket');
var Vector3 = require('../SharedStruct/Vector3');


module.exports = class extends BasePacket {//S2C.
	struct = {
		position: Vector3,
		SpawnDuration: 'float',
		CampIndex: 'uint8',
		TimerType: 'int32',
	}
};
