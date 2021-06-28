var BasePacket = require('../BasePacket');
var TipConfig = require('../SharedStruct/TipConfig');

module.exports = class extends BasePacket {//C2S.START_GAME
	struct = {
		dummy1: ['char', 4],
		TipConfig: TipConfig,
		dummy2: ['char', 8],
	}
};
