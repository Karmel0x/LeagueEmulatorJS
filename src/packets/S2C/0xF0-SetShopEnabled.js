const BasePacket = require('../BasePacket');


module.exports = class SetShopEnabled extends BasePacket {
	static struct = {
		bitfield: ['bitfield', {
			enabled: 1,
			forceEnabled: 2,
		}],
	}
};
