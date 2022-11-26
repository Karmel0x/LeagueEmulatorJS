const BasePacket = require('../BasePacket');

module.exports = class RequestJoinTeam extends BasePacket {
	static struct_header = {
		cmd: 'uint8',
		//netId: 'uint32',
	}
	static struct = {
		pad1: ['char', 3],
		clientId: 'int32',
		teamId: 'uint32',
	}
};
