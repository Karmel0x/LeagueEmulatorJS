const BasePacket = require('../BasePacket');

module.exports = class RequestRename extends BasePacket {
	static struct_header = {
		cmd: 'uint8',
		//netId: 'uint32',
	}
	static struct = {
		playerId: 'int64',
		skinId: 'int32',
		playerName: 'string_',
	}
};
