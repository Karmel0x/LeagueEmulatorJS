const BasePacket = require('../BasePacket');

module.exports = class StartGame extends BasePacket {
	static struct = {
		bitfield: ['bitfield', {
			enablePause: 1,
		}],
	}
};
