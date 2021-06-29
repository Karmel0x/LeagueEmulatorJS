var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//LOADING_SCREEN.CLIENT_READY
	struct_header = {
		cmd: 'uint8',
		//netId: 'uint32',
	}
	struct = {
		ClientID: 'int32',
		TeamId: 'uint32',
	}
};
