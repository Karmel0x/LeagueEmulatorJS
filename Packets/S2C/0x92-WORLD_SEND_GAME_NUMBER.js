var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.WORLD_SEND_GAME_NUMBER
	struct = {
		gameId: 'uint64',
		data: ['char', 128],
	}
};
