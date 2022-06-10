const BasePacket = require('../BasePacket');

module.exports = class SetFoWStatus extends BasePacket {
	static struct = {
		bitfield: ['bitfield', {
			enabled: 1,
		}],
	}
};
