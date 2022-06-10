const BasePacket = require('../BasePacket');

module.exports = class PauseAnimation extends BasePacket {
	static struct = {
		bitfield: ['bitfield', {
			pause: 1,
		}],
	}
};
