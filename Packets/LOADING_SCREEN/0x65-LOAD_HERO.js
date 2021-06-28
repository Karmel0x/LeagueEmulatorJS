var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//LOADING_SCREEN.LOAD_HERO
	struct_header = {
		cmd: 'uint8',
		//netId: 'uint32',
	}
	struct = {
		PlayerId: 'int64',
		SkinId: 'int32',
		SkinName: 'string_',
	}
};
