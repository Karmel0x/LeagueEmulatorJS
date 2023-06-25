const BasePacket = require('../BasePacket');

module.exports = class MarkOrSweepForSoftReconnect extends BasePacket {
	static struct = {
		bitfield: ['bitfield', {
			Unknown: 1,
		}],
	}
};
