const BasePacket = require('../BasePacket');

module.exports = class RequestJoinTeam extends BasePacket {
	static struct_header = {
		cmd: 'uint8',
		//netId: 'uint32',
	}
	static struct = {
		clientId: 'int32',
		team: 'uint32',
	}
};
