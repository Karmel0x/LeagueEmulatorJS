const BasePacket = require('../BasePacket');

module.exports = class LockCamera extends BasePacket {
	static struct = {
		bitfield: ['bitfield', {
			lock: 1,
		}],
	}
};
