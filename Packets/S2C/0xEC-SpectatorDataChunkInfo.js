var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.
	struct = {
		StartGameChunkId: 'int32',
		EndGameChunkId: 'int32',
	}
};
