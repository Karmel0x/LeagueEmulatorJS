const BasePacket = require('../BasePacket');

module.exports = class SyncMissionStartTime extends BasePacket {
	static struct = {
		startTime: 'float',
	}
};
