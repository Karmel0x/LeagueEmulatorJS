var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//GAMEPLAY.HEART_BEAT
	struct = {
		TimeLastServer: 'float',
		TimeLastClient: 'float',
	}
};
