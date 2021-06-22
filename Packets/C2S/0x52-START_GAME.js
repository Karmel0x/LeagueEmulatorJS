var TipConfig = require('../SharedStruct/TipConfig');

module.exports = {//C2S.START_GAME
	cmd: 'uint8',
	netId: 'uint32',

	dummy1: ['char', 4],
	TipConfig: TipConfig,
	dummy2: ['char', 8],
};
