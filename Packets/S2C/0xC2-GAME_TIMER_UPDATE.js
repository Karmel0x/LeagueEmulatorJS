var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//S2C.GAME_TIMER_UPDATE
	struct = {
		StartTime: 'float',
	}
};
