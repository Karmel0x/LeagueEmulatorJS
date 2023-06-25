const BasePacket = require('../BasePacket');

module.exports = class PopCharacterData extends BasePacket {
	static struct = {
		popId: 'uint32',
	}
};
