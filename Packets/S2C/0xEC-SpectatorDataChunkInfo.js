const BasePacket = require('../BasePacket');

module.exports = class SpectatorDataChunkInfo extends BasePacket {
	static struct = {
		startGameChunkId: 'int32',
		endGameChunkId: 'int32',
	}
};
