const BasePacket = require('../BasePacket');

module.exports = class RequestResking extends BasePacket {
	static struct_header = {
		cmd: 'uint8',
		//netId: 'uint32',
	}
	static struct = {
		playerId: 'int64',
		skinId: 'int32',
		skinName: 'string_',
	}
};
