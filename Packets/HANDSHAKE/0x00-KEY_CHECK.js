const BasePacket = require('../BasePacket');

module.exports = class KEY_CHECK extends BasePacket {
	static struct_header = {
		cmd: 'uint8',
		//netId: 'uint32',
	}
	static struct = {
		partialKey: ['uint8', 3],

		clientId: 'uint32',
		playerId: 'uint64',
		//versionNumber: 'uint32',
		//checksum: 'uint64',
		//dummy1: 'uint32',
		encryptedPlayerId: 'uint64',
	}
};
