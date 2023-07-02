const BasePacket = require('../BasePacket');
const SVector3 = require('../sharedstruct/SVector3');

module.exports = class HandleRespawnPointUpdate extends BasePacket {
	static struct = {
		tespawnPointCommand: 'uint8',
		respawnPointUiId: 'uint8',
		team: 'uint32',
		clientId: 'int32',
		position: SVector3,
	}
};
