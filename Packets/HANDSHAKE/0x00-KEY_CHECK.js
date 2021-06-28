var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//HANDSHAKE.KEY_CHECK
	struct_header = {
		cmd: 'uint8',
		//netId: 'uint32',
	}
	struct = {
		partialKey: ['uint8', 3],

		ClientID: 'uint32',
		PlayerID: 'uint64',
		VersionNumber: 'uint32',
		CheckSum: 'uint64',
		dummy1: 'uint32',
	}
};
