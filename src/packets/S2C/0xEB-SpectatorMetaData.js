const BasePacket = require('../BasePacket');

module.exports = class SpectatorMetaData extends BasePacket {
	static struct = {
		jsonMetaData: 'string',
	}
};
