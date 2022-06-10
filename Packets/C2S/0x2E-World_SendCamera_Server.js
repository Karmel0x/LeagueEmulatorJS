const BasePacket = require('../BasePacket');
var SVector3 = require('../SharedStruct/SVector3');

module.exports = class World_SendCamera_Server extends BasePacket {
	static struct = {
		cameraPosition: SVector3,
		cameraDirection: SVector3,
		clientId: 'int32',
		syncId: 'uint8',
	}
};
