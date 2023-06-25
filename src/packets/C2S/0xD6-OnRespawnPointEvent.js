const BasePacket = require('../BasePacket');

module.exports = class OnRespawnPointEvent extends BasePacket {
	static struct = {
		respawnPointEvent: 'uint8',
		respawnPointUiId: 'uint8',
	}
};
