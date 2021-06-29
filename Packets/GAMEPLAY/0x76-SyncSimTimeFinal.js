var BasePacket = require('../BasePacket');

module.exports = class extends BasePacket {//GAMEPLAY.SyncSimTimeFinal
	struct = {
		TimeLastClient: 'float',
		TimeRTTLastOverhead: 'float',
		TimeConvergance: 'float',
	}
};
