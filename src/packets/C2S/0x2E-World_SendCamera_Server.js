const BasePacket = require('../BasePacket');
const SVector3 = require('../sharedstruct/SVector3');

module.exports = class World_SendCamera_Server extends BasePacket {
	static struct = {
		cameraPosition: SVector3,
		cameraDirection: SVector3,
		clientId: 'int32',
		syncId: 'uint8',
	}
};
