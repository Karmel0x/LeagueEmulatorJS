const BasePacket = require('../BasePacket');

module.exports = class PlayThemeMusic extends BasePacket {
	static struct = {
		sourceNetId: 'uint32',
		musicId: 'uint32',
	}
};
