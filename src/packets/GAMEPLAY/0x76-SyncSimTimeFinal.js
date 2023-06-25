const BasePacket = require('../BasePacket');

module.exports = class SyncSimTimeFinal extends BasePacket {
	static struct = {
		timeLastClient: 'float',
		timeRTTLastOverhead: 'float',
		timeConvergance: 'float',
	}
};
