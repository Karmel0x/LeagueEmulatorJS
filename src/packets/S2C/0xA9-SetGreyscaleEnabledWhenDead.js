const BasePacket = require('../BasePacket');


module.exports = class SetGreyscaleEnabledWhenDead extends BasePacket {
	static struct = {
		bitfield: ['bitfield', {
			enabled: 1,
		}],
	}
};
