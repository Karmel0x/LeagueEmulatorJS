const BasePacket = require('../BasePacket');
const SVector3 = require('../SharedStruct/SVector3');

module.exports = class HandleRespawnPointUpdate extends BasePacket {
	static struct = {
		tespawnPointCommand: 'uint8',
		respawnPointUiId: 'uint8',
		teamId: 'uint32',
		clientId: 'int32',
		position: SVector3,
	}
};
