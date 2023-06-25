const BasePacket = require('../BasePacket');

module.exports = class SetHoverIndicatorEnabled extends BasePacket {
	static struct = {
		bitfield: ['bitfield', {
			enabled: 1,
		}],
	}
};
